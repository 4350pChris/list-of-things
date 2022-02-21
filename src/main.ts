import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store, { initStore } from './store'
import vuetify from './plugins/vuetify'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import './plugins/tmdb'
import './plugins/vuerx'

Vue.config.productionTip = false

let app: Vue

firebase.auth().onAuthStateChanged(async user => {
  await initStore(user)
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    })
    app.$vuetify.theme.dark = store.state.settings.dark
    // set dark mode before initializing app, dunno where else to put it
    store.watch(
      state => state.settings.dark,
      (dark: boolean) => (app.$vuetify.theme.dark = dark)
    )
    app.$mount('#app')
  }
  if (user === null) {
    router.push({ name: 'auth' })
  }
})
