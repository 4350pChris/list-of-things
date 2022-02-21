<template>
  <add-to-list :value="lists" @add="addToList">
    <template #append>
      <v-divider />
      <create-list>
        <template #activator="{ on }">
          <v-btn block text color="primary" v-on="on" @click.stop>create list</v-btn>
        </template>
      </create-list>
    </template>
  </add-to-list>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { Prop } from 'vue/types/options'
import { Movie, BaseList } from '@/api/tmdb/models'
import CreateList from '@/components/movies/actions/CreateList.vue'
import AddToList from '@/components/shared/lists/actions/AddToList.vue'
export default Vue.extend({
  components: { CreateList, AddToList },
  props: {
    movie: {
      type: Object as Prop<Movie>,
      required: true
    }
  },
  computed: { ...mapState('movies', ['lists']) },
  methods: {
    async addToList({ id }: BaseList) {
      await this.$store.dispatch('movies/changeListItems', { method: 'POST', listId: id, movieId: this.movie.id })
    }
  }
})
</script>
