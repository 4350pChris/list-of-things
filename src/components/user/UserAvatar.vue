<template>
  <v-img v-if="src" :src="src" />
  <v-icon v-else>mdi-incognito</v-icon>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    src: {
      type: String,
      required: false,
      default: ''
    }
  }
})
</script>
