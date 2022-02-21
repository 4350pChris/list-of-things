import Vue from 'vue'
import Vuex from 'vuex'
import { firestoreAction, vuexfireMutations } from 'vuexfire'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import movies from './movies'
import books from './books'
import items, { init as initItems } from './items'
import { db } from '@/db'

Vue.use(Vuex)

export type TmdbAuth = { token: string; sessionId: string; accountId: number }

export type Auth = { tmdb: TmdbAuth | null }

export type Settings = { dark: boolean }

export interface RootState {
  user: firebase.User | null
  settings: Settings
  auth: Auth
}

export function loggedInOrError(user: firebase.User | null) {
  if (user === null) {
    throw new Error('You must be logged in.')
  }
  return user
}

const store = new Vuex.Store<RootState>({
  state: {
    user: null,
    settings: { dark: false },
    auth: { tmdb: null }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    ...vuexfireMutations
  },
  actions: {
    saveAuth: firestoreAction(({ state }, payload: Partial<Auth>) => {
      const user = loggedInOrError(state.user)
      return db
        .collection('auth')
        .doc(user.uid)
        .set(payload, { merge: true })
    }),
    bindAuth: firestoreAction(({ bindFirestoreRef, state }) => {
      const user = loggedInOrError(state.user)
      return bindFirestoreRef('auth', db.collection('auth').doc(user.uid))
    }),
    unbindAuth: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef('auth')
    }),
    saveSettings: firestoreAction(({ state }, payload: Partial<Settings>) => {
      const user = loggedInOrError(state.user)
      return db
        .collection('settings')
        .doc(user.uid)
        .set(payload, { merge: true })
    }),
    bindSettings: firestoreAction(({ bindFirestoreRef, state }) => {
      const user = loggedInOrError(state.user)
      return bindFirestoreRef('settings', db.collection('settings').doc(user.uid))
    }),
    unbindSettings: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef('settings')
    }),
    async unlinkProvider({ state, commit }, id: string) {
      const user = state.user
      if (user) {
        const updatedUser = await user.unlink(id)
        commit('setUser', updatedUser)
      }
    },
    async changePassword({ state }, payload: { newPassword: string; oldPassword: string }) {
      const user = state.user
      if (user && user.email) {
        await user.reauthenticateWithCredential(
          firebase.auth.EmailAuthProvider.credential(user.email, payload.oldPassword)
        )
        await user.updatePassword(payload.newPassword)
      }
    },
    deleteAccount({ state }) {
      const user = state.user
      if (user) {
        return user.delete()
      }
    }
  },
  modules: {
    movies,
    books,
    items
  }
})

export async function initStore(user: RootState['user']) {
  store.commit('setUser', user)
  if (user === null) {
    await store.dispatch('unbindAuth')
    store.commit('movies/resetState')
  } else {
    await Promise.all([store.dispatch('bindAuth'), store.dispatch('bindSettings')])
    if (store.state.auth.tmdb) {
      await store.dispatch('movies/fetchAccount')
    }
    await initItems(store)
  }
}

export default store
