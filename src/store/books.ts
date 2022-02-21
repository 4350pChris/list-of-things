import { Module, Store } from 'vuex'
import { firestoreAction } from 'vuexfire'
import { db } from '@/db'
import { RootState, loggedInOrError } from './index'
import { GoogleBook } from '../api/books/GoogleBook'
import { getById } from '../api/books/volumes'

export interface BookList {
  id: string
  name: string
  description: string
  items: string[]
}

export interface ListState {
  books: GoogleBook[]
  lists: BookList[]
}

function getDefaultState(): ListState {
  return { books: [], lists: [] }
}

const store: Module<ListState, RootState> = {
  state: getDefaultState(),
  getters: {
    listById: state => (id: string) => state.lists.find(l => l.id === id),
    bookById: state => (id: string) => state.books.find(b => b.id === id)
  },
  mutations: {
    addBook(state, book: GoogleBook) {
      if (!state.books.some(({ id }) => book.id === id)) {
        state.books = [...state.books, book]
      }
    }
  },
  actions: {
    bindLists: firestoreAction(({ bindFirestoreRef, rootState }) => {
      const user = loggedInOrError(rootState.user)
      return bindFirestoreRef(
        'lists',
        db
          .collection('lists')
          .doc(user.uid)
          .collection('books')
      )
    }),
    saveList: firestoreAction(({ rootState }, payload: Partial<BookList>) => {
      const user = loggedInOrError(rootState.user)
      const col = db
        .collection('lists')
        .doc(user.uid)
        .collection('books')
      if (payload.id) {
        return col.doc(payload.id).set({ ...payload }, { merge: true })
      } else {
        return col.add(payload)
      }
    }),
    removeList: firestoreAction(({ rootState }, id: string) => {
      const user = loggedInOrError(rootState.user)
      return db
        .collection('lists')
        .doc(user.uid)
        .collection('books')
        .doc(id)
        .delete()
    }),
    addItem({ dispatch }, payload: { list: BookList; item: string }) {
      if (payload.list.items.some(id => id === payload.item)) return
      return dispatch('saveList', { id: payload.list.id, items: [...payload.list.items, payload.item] })
    },
    async fetchBook({ commit }, id: string) {
      const book = await getById(id)
      commit('addBook', book)
    }
  },
  namespaced: true
}

export function init(store: Store<RootState>) {
  return store.dispatch('books/bindLists')
}

export default store
