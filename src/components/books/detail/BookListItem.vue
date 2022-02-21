<template>
  <v-list-item>
    <v-list-item-avatar v-if="value.volumeInfo.imageLinks" tile size="120">
      <book-image :value="value" contain />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>
        {{ value.volumeInfo.title }}
        <span v-if="value.volumeInfo.subtitle" class="subtitle-2"> - {{ value.volumeInfo.subtitle }}</span>
      </v-list-item-title>
      <v-list-item-subtitle v-html="value.volumeInfo.description" />
      <v-list-item-subtitle v-if="value.volumeInfo.authors" v-text="value.volumeInfo.authors.join(', ')" />
    </v-list-item-content>
    <v-list-item-action class="align-self-center">
      <add-to-list :value="value.id" />
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue/types/options'
import { GoogleBook } from '@/api/books/GoogleBook'
import AddToList from '@/components/books/actions/AddToList.vue'
import BookImage from '@/components/books/detail/BookImage.vue'
export default Vue.extend({
  components: { AddToList, BookImage },
  props: {
    value: {
      type: Object as Prop<GoogleBook>,
      required: true
    }
  }
})
</script>
