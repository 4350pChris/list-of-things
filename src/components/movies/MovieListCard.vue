<template>
  <v-card hover :to="{ name: 'movie-detail-list', params: { id: list.id } }">
    <v-img v-if="backdropSrc" :src="backdropSrc" :lazy-src="backdropLazySrc" contain />
    <v-card-title class="headline">
      {{ list.name }}
      <span class="pl-2 pt-1 body-1">{{ list['number_of_items'] }}</span>
      <v-spacer />
      <v-icon>{{ list.public ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
    </v-card-title>
    <v-card-subtitle>{{ list.description }}</v-card-subtitle>
    <v-card-actions>
      <edit-list :value="list.id" />
      <v-spacer />
      <delete-list :value="list.id" />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue/types/options'
import { getImageURL } from '@/api/tmdb/images'
import { BaseList } from '@/api/tmdb/models'
import EditList from '@/components/movies/actions/EditList.vue'
import DeleteList from '@/components/movies/actions/DeleteList.vue'
export default Vue.extend({
  components: { DeleteList, EditList },
  props: {
    list: {
      type: Object as Prop<BaseList>,
      required: true
    }
  },
  computed: {
    backdropSrc() {
      const path = this.list.backdrop_path
      return path ? getImageURL(780, path) : ''
    },
    backdropLazySrc() {
      const path = this.list.backdrop_path
      return path ? getImageURL(92, path) : ''
    }
  }
})
</script>
