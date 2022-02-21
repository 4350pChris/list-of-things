<template>
  <list-dialog v-model="list" :loading="loading" title="Create New List">
    <template #append-form="{ list }">
      <v-checkbox v-model="list.public" label="Public" />
    </template>
    <template #submit="{ done }">
      <v-btn color="primary" @click="createList(done)">create</v-btn>
    </template>
    <template #activator="{ on }">
      <slot name="activator" :on="on">
        <fab-button bottom right v-on="on" />
      </slot>
    </template>
  </list-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { ListCreationOptions } from '@/api/tmdb/list'
import ListDialog from '@/components/shared/lists/actions/ListDialog.vue'
import FabButton from '@/components/shared/FabButton.vue'

export default Vue.extend({
  components: { FabButton, ListDialog },
  data: () => ({
    loading: false,
    valid: false,
    list: { name: '', iso_639_1: 'en', iso_3166_1: 'US', description: '', public: false } as ListCreationOptions
  }),
  methods: {
    async createList(done: () => void) {
      this.loading = true
      try {
        await this.$store.dispatch('movies/createList', this.list)
        done()
      } catch (e) {
        alert(e)
      } finally {
        this.loading = false
      }
    }
  }
})
</script>
