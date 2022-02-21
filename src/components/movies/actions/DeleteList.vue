<template>
  <delete-list :loading="loading" @submit="deleteList" />
</template>

<script lang="ts">
import Vue from 'vue'
import DeleteList from '@/components/shared/lists/actions/DeleteList.vue'
export default Vue.extend({
  components: { DeleteList },
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data: () => ({ loading: false }),
  methods: {
    async deleteList(done: () => void) {
      this.loading = true
      try {
        await this.$store.dispatch('movies/deleteList', this.value)
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
