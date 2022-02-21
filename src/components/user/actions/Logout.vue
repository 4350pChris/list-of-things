<template>
  <v-btn text @click="logout">
    <v-icon>mdi-logout</v-icon>
    Logout
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'
import * as firebase from 'firebase/app'
import 'firebase/auth'

export default Vue.extend({
  methods: {
    async logout() {
      try {
        await firebase.auth().signOut()
      } catch (e) {
        alert('Failed to log out' + e)
      }
    }
  }
})
</script>
