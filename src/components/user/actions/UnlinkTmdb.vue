<template>
  <v-btn icon @click="logout">
    <v-icon>mdi-link-variant-off</v-icon>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'

export default Vue.extend({
  methods: {
    ...mapActions('movies', ['unlinkTmdb']),
    logout() {
      this.unlinkTmdb().catch(() => alert('Failed to unlink TMDB account.'))
    }
  }
})
</script>
