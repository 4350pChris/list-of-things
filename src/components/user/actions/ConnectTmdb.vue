<template>
  <v-list-item @click="click">
    <v-list-item-icon>
      <tmdb-image contain width="40" />
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>Link TMDB Account</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import Vue from 'vue'
import TmdbImage from '@/components/shared/TmdbImage.vue'

export default Vue.extend({
  components: { TmdbImage },
  methods: {
    async click() {
      try {
        await this.$store.dispatch('movies/linkTmdb')
      } catch (e) {
        alert(e)
      }
    }
  }
})
</script>
