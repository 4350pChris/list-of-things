<template>
  <v-row justify="center">
    <v-col>
      <div class="text-center headline">Choose a Login Method</div>
      <div id="firebase-auth"></div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import * as firebase from 'firebase/app'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

export default Vue.extend({
  mounted() {
    const uiConfig: firebaseui.auth.Config = {
      signInSuccessUrl: '/',
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ]
    }
    let ui = firebaseui.auth.AuthUI.getInstance()
    if (ui === null) {
      ui = new firebaseui.auth.AuthUI(firebase.auth())
    }
    ui.start('#firebase-auth', uiConfig)
  }
})
</script>

<style>
#firebase-auth > div > div.firebaseui-card-content > form > ul {
  padding: 0;
}
</style>
