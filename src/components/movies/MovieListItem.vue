<template>
  <v-list-item three-line>
    <v-list-item-icon tile>
      <v-img alt="Movie Poster" contain :src="imageUrl" width="92" />
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>{{ movie.title }}</v-list-item-title>
      <v-list-item-subtitle>
        {{ movie.overview }}
      </v-list-item-subtitle>
      <v-list-item-subtitle>{{ formattedDate }} | {{ genres }}</v-list-item-subtitle>
      <v-list-item-subtitle>
        {{ movie['vote_average'] }} / 10
        <v-icon class="mb-1" color="amber">mdi-star</v-icon>
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action class="align-self-center">
      <add-to-list :movie="movie" />
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import Vue from 'vue'
import AddToList from '@/components/movies/actions/AddToList.vue'
import { Prop } from 'vue/types/options'
import { Movie } from '@/api/tmdb/models'
import { getImageURL } from '@/api/tmdb/images'
import { mapGetters } from 'vuex'

export default Vue.extend({
  components: { AddToList },
  props: {
    movie: {
      type: Object as Prop<Movie>,
      required: true
    }
  },
  computed: {
    ...mapGetters('movies', ['genresForMovie']),
    formattedDate() {
      const date = new Date(this.movie.release_date)
      return date.toLocaleDateString()
    },
    imageUrl() {
      return getImageURL(92, this.movie.poster_path)
    },
    genres() {
      return this.genresForMovie(this.movie)?.join(', ')
    }
  }
})
</script>
