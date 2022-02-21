import { Module, Store } from 'vuex'
import { RootState, TmdbAuth } from './index'
import theMovieDb from 'themoviedb-javascript-library'
import { getLists } from '@/api/tmdb/account'
import { BaseList, DetailList, Movie } from '@/api/tmdb/models'
import {
  changeItems,
  getList,
  createList,
  ListCreationOptions,
  changeList,
  ListUpdateOptions,
  deleteList,
  commentItem
} from '@/api/tmdb/list'
import {
  logout,
  getRequestToken,
  generateAuthUrl,
  getAccessTokenAndAccountId,
  convertTokenToSession
} from '@/api/tmdb/auth'

export interface Account {
  id: number
  name: string
  username: string
}

export type RatedMovie = Movie & { rating: number }

export type Genre = { id: number; name: string }

export interface MovieState {
  account: Account | null
  lists: BaseList[]
  details: DetailList[]
  rated: RatedMovie[]
  genres: Genre[]
}

function tmdbLinkedOrError(tmdb?: TmdbAuth | null) {
  if (tmdb === null || tmdb === undefined) {
    throw new Error('No linked TMDB account.')
  }
  return tmdb
}

function getDefaultState(): MovieState {
  return {
    account: null,
    lists: [],
    details: [],
    rated: [],
    genres: []
  }
}

const store: Module<MovieState, RootState> = {
  state: getDefaultState(),
  getters: {
    listById: state => (id: number) => state.details.find(d => d.id === id),
    commentByIds: state => (listId: number, movieId: number) => {
      const list = state.details.find(({ id }) => id === listId)
      return list?.comments['movie:' + movieId] || undefined
    },
    genresForMovie: state => ({ genre_ids }: Movie) => genre_ids.map(id => state.genres.find(g => g.id === id)?.name)
  },
  mutations: {
    setAccount(state, acc) {
      state.account = acc
    },
    addLists(state, lists: BaseList[]) {
      const filtered = state.lists.filter(l => !lists.some(({ id }) => l.id === id))
      state.lists = [...filtered, ...lists]
    },
    addDetailList(state, detail: DetailList) {
      const filtered = state.details.filter(({ id }) => id !== detail.id)
      state.details = [...filtered, detail]
    },
    removeList(state, id: number) {
      const filteredBaseLists = state.lists.filter(l => l.id !== id)
      state.lists = filteredBaseLists
      const filteredDetailLists = state.details.filter(l => l.id !== id)
      state.details = filteredDetailLists
    },
    addRatedMovies(state, movies: RatedMovie[]) {
      const filtered = state.rated.filter(rated => !movies.some(({ id }) => rated.id === id))
      state.rated = [...filtered, ...movies]
    },
    setGenres(state, genres: Genre[]) {
      state.genres = genres
    },
    resetState(state) {
      Object.assign(state, getDefaultState())
    }
  },
  actions: {
    linkTmdb({ dispatch }) {
      return new Promise(async resolve => {
        const requestToken = await getRequestToken()
        const authUrl = generateAuthUrl(requestToken)
        const w = window.open(authUrl)
        const timer = setInterval(async () => {
          if (w !== null && w.closed) {
            clearInterval(timer)
            const { access_token: token, account_id: accountId } = await getAccessTokenAndAccountId(requestToken)
            const sessionId = await convertTokenToSession(token)
            await dispatch('saveAuth', { tmdb: { token, sessionId, accountId } }, { root: true })
            await dispatch('fetchAccount')
            resolve()
          }
        }, 500)
      })
    },
    async unlinkTmdb({ dispatch, commit, rootState }) {
      const tmdb = tmdbLinkedOrError(rootState.auth?.tmdb)
      const { token, sessionId } = tmdb
      await logout({ token, sessionId })
      await dispatch('saveAuth', { tmdb: null }, { root: true })
      commit('resetState')
    },
    async fetchAccount({ commit, rootState }) {
      const tmdb = tmdbLinkedOrError(rootState.auth?.tmdb)
      const account = await new Promise<Account>((resolve, reject) =>
        theMovieDb.account.getInformation(
          { session_id: tmdb.sessionId },
          (res: string) => resolve(JSON.parse(res)),
          (e: string) => reject(e)
        )
      )
      commit('setAccount', account)
    },
    async fetchLists({ commit, rootState }) {
      const tmdb = tmdbLinkedOrError(rootState.auth?.tmdb)
      const { token, accountId } = tmdb
      const lists = await getLists({ token, accountId })
      commit('addLists', lists)
    },
    async fetchDetailList({ commit, rootState }, id) {
      const tmdb = tmdbLinkedOrError(rootState.auth?.tmdb)
      const { token } = tmdb
      const list = await getList({ token, id })
      commit('addDetailList', list)
    },
    async rateMovie({ dispatch, commit, state, rootState }, payload: { id: number; rating: number }) {
      const { sessionId } = tmdbLinkedOrError(rootState.auth?.tmdb)
      await new Promise<void>((resolve, reject) =>
        theMovieDb.movies.rate(
          { session_id: sessionId, id: payload.id },
          payload.rating,
          () => resolve(),
          (e: string) => reject(e)
        )
      )
      const detail = state.details.find(l => l.results.find(movie => movie.id === payload.id))
      if (detail !== undefined) {
        await dispatch('fetchDetailList', detail.id)
      }
      commit('addRatedMovies', [payload])
    },
    async fetchRatedMovies({ commit, rootState }) {
      const { sessionId, accountId } = tmdbLinkedOrError(rootState.auth?.tmdb)
      const list: { results: Movie[] } = await new Promise((resolve, reject) =>
        theMovieDb.account.getRatedMovies(
          { session_id: sessionId, id: accountId },
          (res: string) => resolve(JSON.parse(res)),
          (e: string) => reject(e)
        )
      )
      commit('addRatedMovies', list.results)
    },
    async changeListItems(
      { dispatch, rootState },
      payload: { method: 'POST' | 'DELETE'; listId: number; movieId: number }
    ) {
      const { token } = tmdbLinkedOrError(rootState.auth?.tmdb)
      await changeItems(payload.method, {
        token,
        id: payload.listId,
        items: [{ media_id: payload.movieId, media_type: 'movie' }]
      })
      return Promise.all([dispatch('fetchDetailList', payload.listId), dispatch('fetchLists')])
    },
    async createList({ dispatch, rootState }, list: ListCreationOptions) {
      const { token } = tmdbLinkedOrError(rootState.auth?.tmdb)
      const id = await createList({ token, list })
      return Promise.all([dispatch('fetchDetailList', id), dispatch('fetchLists')])
    },
    async updateList({ dispatch, rootState }, list: ListUpdateOptions) {
      const { token } = tmdbLinkedOrError(rootState.auth?.tmdb)
      await changeList({ token, list })
      return Promise.all([dispatch('fetchDetailList', list.id), dispatch('fetchLists')])
    },
    async deleteList({ commit, rootState }, id: number) {
      const { token } = tmdbLinkedOrError(rootState.auth?.tmdb)
      await deleteList({ token, id })
      commit('removeList', id)
    },
    async comment({ dispatch, rootState }, payload: { listId: number; movieId: number; comment: string }) {
      const { token } = tmdbLinkedOrError(rootState.auth?.tmdb)
      await commentItem({
        token,
        id: payload.listId,
        items: [{ media_id: payload.movieId, comment: payload.comment, media_type: 'movie' }]
      })
      return dispatch('fetchDetailList', payload.listId)
    },
    getGenres({ commit }) {
      theMovieDb.genres.getMovieList(
        {},
        (res: string) => commit('setGenres', JSON.parse(res).genres),
        (err: string) => {
          throw new Error(err)
        }
      )
    }
  },
  namespaced: true
}

export function init(store: Store<RootState>) {
  return Promise.all([
    store.dispatch('movies/getGenres'),
    store.dispatch('movies/fetchLists'),
    store.dispatch('movies/fetchRatedMovies')
  ])
}

export default store
