<template>
  <v-btn v-bind="$attrs" fixed fab dark color="primary" :style="`margin-bottom: ${marginBottom};`" v-on="$listeners">
    <v-icon>mdi-plus</v-icon>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  computed: {
    marginBottom(): string {
      return this.$vuetify.breakpoint.smAndDown ? '56px' : '0'
    }
  }
})
</script>
