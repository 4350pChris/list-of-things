import * as firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
  authDomain: 'list-of-things-cec0a.firebaseapp.com',
  databaseURL: 'https://list-of-things-cec0a.firebaseio.com',
  projectId: 'list-of-things-cec0a',
  storageBucket: 'list-of-things-cec0a.appspot.com',
  messagingSenderId: '497192436991',
  appId: '1:497192436991:web:06e6db26724ee175f5b8ca'
}

export const db = firebase.initializeApp(firebaseConfig).firestore()
