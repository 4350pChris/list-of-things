<template>
  <v-dialog v-model="dialog" max-width="400">
    <template #activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-comment-text</v-icon>
      </v-btn>
    </template>
    <v-card :loading="loading">
      <v-card-title>My Comment</v-card-title>
      <v-card-text>
        <v-textarea v-model="comment" auto-grow hide-details outlined />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="dialog = false">cancel</v-btn>
        <v-btn color="primary" @click="save">comment</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Prop } from 'vue/types/options'
import { ItemKind } from '@/store/items'
export default Vue.extend({
  props: {
    kind: {
      type: String as Prop<ItemKind>,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },
  data: () => ({ comment: '', dialog: false, loading: false }),
  computed: { ...mapGetters('items', ['commentById']) },
  created() {
    this.comment = this.commentById(this.value)
  },
  methods: {
    async save() {
      this.loading = true
      try {
        await this.$store.dispatch('items/comment', { item: this.value, kind: this.kind, value: this.comment })
        this.dialog = false
      } catch (e) {
        alert(e)
      } finally {
        this.loading = false
      }
    }
  }
})
</script>
