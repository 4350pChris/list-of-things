<template>
  <v-fade-transition group tag="div" class="row">
    <v-col v-for="list in lists" :key="list.id" cols="12" sm="6" lg="4" xl="3">
      <movie-list-card :list="list" />
    </v-col>
    <create-list key="create-list" />
  </v-fade-transition>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import CreateList from '@/components/movies/actions/CreateList.vue'
import MovieListCard from '@/components/movies/MovieListCard.vue'

export default Vue.extend({
  components: { CreateList, MovieListCard },
  computed: { ...mapState('movies', ['lists']) }
})
</script>
