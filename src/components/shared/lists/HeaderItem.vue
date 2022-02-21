<template>
  <v-list-item>
    <v-list-item-content style="flex: 0 1 auto;">
      <v-list-item-title class="display-1">
        {{ title }}
        <span class="pl-2 pt-1 body-1">{{ count }}</span>
      </v-list-item-title>
      <v-list-item-subtitle class="subtitle-1">
        {{ description }}
      </v-list-item-subtitle>
    </v-list-item-content>
    <slot name="append" />
  </v-list-item>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    count: {
      type: [Number, String],
      required: true
    }
  }
})
</script>
