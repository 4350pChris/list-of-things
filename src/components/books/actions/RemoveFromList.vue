<template>
  <remove-from-list :loading="loading" @submit="remove" />
</template>

<script lang="ts">
import Vue from 'vue'
import RemoveFromList from '@/components/shared/lists/actions/RemoveFromList.vue'
import { Prop } from 'vue/types/options'
import { BookList } from '@/store/books'
export default Vue.extend({
  components: { RemoveFromList },
  props: {
    bookId: {
      type: String,
      required: true
    },
    list: {
      type: Object as Prop<BookList>,
      required: true
    }
  },
  data: () => ({ loading: false }),
  methods: {
    async remove(done: () => void) {
      this.loading = true
      try {
        const items = this.list.items.filter(id => id !== this.bookId)
        await this.$store.dispatch('books/saveList', { id: this.list.id, items })
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
