<template>
  <v-img :src="source" v-bind="$attrs" />
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    hash: {
      type: String,
      required: true
    }
  },
  computed: {
    source() {
      return `https://www.gravatar.com/avatar/${this.hash}`
    }
  }
})
</script>
