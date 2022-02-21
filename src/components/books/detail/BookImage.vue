<template>
  <v-img v-bind="$attrs" :src="image" />
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue/types/options'
import { GoogleBook } from '@/api/books/GoogleBook'
export default Vue.extend({
  props: {
    value: {
      type: Object as Prop<GoogleBook>,
      required: true
    }
  },
  computed: {
    image(): string {
      const links = this.value.volumeInfo.imageLinks
      if (links.large) return links.large
      if (links.medium) return links.medium
      if (links.small) return links.small
      if (links.smallThumbnail) return links.smallThumbnail
      return links.thumbnail
    }
  }
})
</script>
