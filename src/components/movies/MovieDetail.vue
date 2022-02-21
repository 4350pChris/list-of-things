<template>
  <v-card v-bind="$attrs">
    <v-img contain :src="image" :lazy-src="lazyImage" />
    <v-card-title style="word-break: break-word;">{{ movie.title }}</v-card-title>
    <v-card-subtitle>
      {{ runtime }} | {{ formattedDate }} <br />
      {{ genres }}
    </v-card-subtitle>
    <v-container class="pt-0" fluid>
      <movie-rating :movie="movie" />
      <span class="body-2">{{ movie['vote_average'] }} ({{ movie['vote_count'] }} votes)</span>
    </v-container>
    <v-expand-transition>
      <v-card-text v-show="details">{{ movie.overview }}</v-card-text>
    </v-expand-transition>
    <v-divider />
    <v-card-actions>
      <v-btn color="primary" text @click="details = !details">
        {{ details ? 'Collapse' : 'Summary' }}
      </v-btn>
      <comment :list-id="listId" :movie-id="movie.id" />
      <v-spacer />
      <remove-from-list v-if="removable" :list-id="listId" :movie-id="movie.id" />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import MovieRating from '@/components/movies/MovieRating.vue'
import RemoveFromList from '@/components/movies/actions/RemoveFromList.vue'
import Comment from '@/components/movies/actions/Comment.vue'
import { getImageURL } from '@/api/tmdb/images'
import { Movie } from '@/api/tmdb/models'
import { Prop } from 'vue/types/options'
import theMovieDb from 'themoviedb-javascript-library'
import { mapGetters } from 'vuex'

export default Vue.extend({
  components: { Comment, MovieRating, RemoveFromList },
  props: {
    listId: {
      type: Number,
      required: false,
      default: -1
    },
    movie: {
      type: Object as Prop<Movie>,
      required: true
    },
    removable: Boolean,
    wide: Boolean
  },
  data: () => ({ details: false, runtime: '' }),
  computed: {
    ...mapGetters('movies', ['genresForMovie']),
    path(): string {
      const key = this.wide === undefined || this.wide === false ? 'poster_path' : 'backdrop_path'
      return this.movie[key]
    },
    image(): string {
      return getImageURL(500, this.path)
    },
    lazyImage(): string {
      return getImageURL(92, this.path)
    },
    formattedDate(): string {
      const date = new Date(this.movie.release_date)
      return date.toLocaleDateString()
    },
    genres(): string {
      return this.genresForMovie(this.movie)?.join(', ')
    }
  },
  created() {
    this.fetchRuntime()
  },
  methods: {
    fetchRuntime() {
      theMovieDb.movies.getById(
        { id: this.movie.id },
        (res: string) => {
          const total = JSON.parse(res).runtime
          const hours = Math.floor(total / 60)
          const minutes = total % 60
          this.runtime = `${hours}h ${minutes}min`
        },
        (e: string) => alert(e)
      )
    }
  }
})
</script>
