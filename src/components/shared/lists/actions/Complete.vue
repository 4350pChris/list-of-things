<template>
  <v-progress-circular
    style="cursor: pointer;"
    :color="color"
    :value="completed ? 100 : 0"
    width="2"
    @click="completed = !completed"
  >
    <v-icon :color="color">mdi-check</v-icon>
  </v-progress-circular>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue/types/options'
import { ItemKind } from '@/store/items'
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters('items', ['completedById']),
    completed: {
      get() {
        return this.completedById(this.value) || false
      },
      set(completed: boolean) {
        this.$store.dispatch('items/complete', { item: this.value, kind: this.kind, value: completed })
      }
    },
    color(): string {
      return this.completed ? 'success' : ''
    }
  }
})
</script>
