<template>
  <v-rating
    :length="10"
    :value="rating"
    :color="ratedMovie ? 'amber' : ''"
    half-increments
    size="16"
    dense
    hover
    @input="rate"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { RatedMovie } from '@/store/movies'
import { Movie } from '@/api/tmdb/models'
import { Prop } from 'vue/types/options'

export default Vue.extend({
  props: {
    movie: {
      type: Object as Prop<Movie>,
      required: true
    }
  },
  computed: {
    ...mapState('movies', ['rated']),
    rating(): number {
      return this.ratedMovie === undefined ? (this.movie as Movie).vote_average : this.ratedMovie.rating
    },
    ratedMovie(): RatedMovie | undefined {
      return (this.rated as RatedMovie[]).find(({ id }) => id === this.movie.id)
    }
  },
  methods: {
    rate(rating: number) {
      this.$store.dispatch('movies/rateMovie', { id: this.movie.id, rating })
    }
  }
})
</script>
