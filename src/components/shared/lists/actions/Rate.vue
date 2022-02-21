<template>
  <v-rating color="amber" size="18" hover half-increments :value="rating" @input="rate" />
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue/types/options'
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters('items', ['ratingById']),
    rating(): number | undefined {
      return this.ratingById(this.value)
    }
  },
  methods: {
    rate(value: number) {
      this.$store.dispatch('items/rate', { item: this.value, kind: this.kind, value }).catch(e => alert(e))
    }
  }
})
</script>
