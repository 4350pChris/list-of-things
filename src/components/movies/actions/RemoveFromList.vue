<template>
  <remove-from-list :loading="loading" @submit="remove" />
</template>

<script lang="ts">
import Vue from 'vue'
import RemoveFromList from '@/components/shared/lists/actions/RemoveFromList.vue'
export default Vue.extend({
  components: { RemoveFromList },
  props: {
    movieId: {
      type: Number,
      required: true
    },
    listId: {
      type: Number,
      required: true
    }
  },
  data: () => ({ loading: false }),
  methods: {
    async remove(done: () => void) {
      this.loading = true
      try {
        await this.$store.dispatch('movies/changeListItems', {
          method: 'DELETE',
          listId: this.listId,
          movieId: this.movieId
        })
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
