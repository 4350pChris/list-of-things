<template>
  <v-row justify="center">
    <v-col cols="10" sm="5" md="4" lg="3">
      <v-card outlined color="transparent">
        <tmdb-image contain />
        <v-card-text>
          The movies section connects to
          <a href="https://www.themoviedb.org">The Movie DB</a>
          to keep track of lists. Create an account and link it to continue.
        </v-card-text>
        <v-card-actions>
          <v-btn color="info" block @click="connect">link tmdb account</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import TmdbImage from '@/components/shared/TmdbImage.vue'

export default Vue.extend({
  components: { TmdbImage },
  methods: {
    async connect() {
      try {
        await this.$store.dispatch('movies/linkTmdb')
        this.$router.replace({ name: 'movies' })
      } catch (e) {
        alert(e)
      }
    }
  }
})
</script>
