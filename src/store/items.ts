import { RootState, loggedInOrError } from '.'
import { db } from '@/db'
import { Module, Store } from 'vuex'
import { firestoreAction } from 'vuexfire'

export type ItemKind = 'book' | 'movie'

export interface ItemProperty {
  item: string
  kind: ItemKind
  user: string
  value: string | number | boolean
}

export interface ItemsState {
  completed: ItemProperty[]
  comments: ItemProperty[]
  ratings: ItemProperty[]
}

function bindGroup(
  user: RootState['user'] | null,
  bindFirestoreRef: (key: string, query: firebase.firestore.Query) => Promise<object>,
  key: string
) {
  const { uid } = loggedInOrError(user)
  return bindFirestoreRef(key, db.collectionGroup(key).where('user', '==', uid))
}

function setProperty(rootUser: RootState['user'], coll: string, item: Omit<ItemProperty, 'user'>) {
  const user = loggedInOrError(rootUser)
  return db
    .collection('items')
    .doc(item.item)
    .collection(coll)
    .doc(user.uid)
    .set({ ...item, user: user.uid })
}

function getDefaultState(): ItemsState {
  return { completed: [], comments: [], ratings: [] }
}

const store: Module<ItemsState, RootState> = {
  state: getDefaultState(),
  getters: {
    ratingById: state => (id: string) => state.ratings.find(r => r.item === id)?.value,
    commentById: state => (id: string) => state.comments.find(r => r.item === id)?.value,
    completedById: state => (id: string) => state.completed.find(r => r.item === id)?.value
  },
  actions: {
    bindRatings: firestoreAction(({ rootState, bindFirestoreRef }) => {
      return bindGroup(rootState.user, bindFirestoreRef, 'ratings')
    }),
    bindComments: firestoreAction(({ rootState, bindFirestoreRef }) => {
      return bindGroup(rootState.user, bindFirestoreRef, 'comments')
    }),
    bindCompleted: firestoreAction(({ rootState, bindFirestoreRef }) => {
      return bindGroup(rootState.user, bindFirestoreRef, 'completed')
    }),
    rate({ rootState }, payload: Omit<ItemProperty, 'user'>) {
      return setProperty(rootState.user, 'ratings', payload)
    },
    comment({ rootState }, payload: Omit<ItemProperty, 'user'>) {
      return setProperty(rootState.user, 'comments', payload)
    },
    complete({ rootState }, payload: Omit<ItemProperty, 'user'>) {
      return setProperty(rootState.user, 'completed', payload)
    }
  },
  namespaced: true
}

export function init(store: Store<RootState>) {
  return Promise.all([
    store.dispatch('items/bindComments'),
    store.dispatch('items/bindRatings'),
    store.dispatch('items/bindCompleted')
  ])
}

export default store
