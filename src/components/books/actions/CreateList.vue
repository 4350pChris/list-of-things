<template>
  <list-dialog v-model="list" :loading="loading" title="Create New List">
    <template #activator="{ on }">
      <slot name="activator" :on="on">
        <fab-button bottom right v-on="on" />
      </slot>
    </template>
    <template #submit="{ done }">
      <v-btn color="primary" @click="createList(done)">create</v-btn>
    </template>
  </list-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { BookList } from '@/store/books'
import ListDialog from '@/components/shared/lists/actions/ListDialog.vue'
import FabButton from '@/components/shared/FabButton.vue'

export default Vue.extend({
  components: { FabButton, ListDialog },
  data: () => ({
    dialog: false,
    loading: false,
    list: { name: '', description: '', items: [] } as Omit<BookList, 'id'>
  }),
  methods: {
    async createList(done: () => void) {
      this.loading = true
      try {
        await this.$store.dispatch('books/saveList', this.list)
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
