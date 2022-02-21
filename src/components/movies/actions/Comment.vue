<template>
  <comment v-model="comment" :loading="loading" @submit="saveComment" />
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import Comment from '@/components/shared/lists/actions/Comment.vue'
export default Vue.extend({
  components: { Comment },
  props: {
    listId: {
      type: Number,
      required: true
    },
    movieId: {
      type: Number,
      required: true
    }
  },
  data: () => ({ comment: '', loading: false }),
  computed: { ...mapGetters('movies', ['commentByIds']) },
  mounted() {
    this.comment = this.commentByIds(this.listId, this.movieId)
  },
  methods: {
    async saveComment(done: () => void) {
      this.loading = true
      try {
        await this.$store.dispatch('movies/comment', {
          listId: this.listId,
          movieId: this.movieId,
          comment: this.comment
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
