<template>
  <v-card hover :to="{ name: 'book-detail-list', params: { id: value.id } }">
    <v-card-title class="headline">
      {{ value.name }}
      <span class="pl-2 pt-1 body-1">{{ value.items.length }}</span>
    </v-card-title>
    <v-card-text v-if="value.description" v-text="value.description" />
    <v-card-actions>
      <edit-list :value="value" icon />
      <v-spacer />
      <delete-list :value="value.id" />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue/types/options'
import { BookList } from '@/store/books'
import DeleteList from '@/components/books/actions/DeleteList.vue'
import EditList from '@/components/books/actions/EditList.vue'

export default Vue.extend({
  components: { DeleteList, EditList },
  props: {
    value: {
      type: Object as Prop<BookList>,
      required: true
    }
  }
})
</script>
