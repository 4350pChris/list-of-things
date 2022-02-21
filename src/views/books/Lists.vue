<template>
  <v-fade-transition group tag="div" class="row">
    <v-col v-for="list in lists" :key="list.id" cols="12" sm="6" lg="4" xl="3">
      <book-list-detail :value="list" />
    </v-col>
    <create-list key="create-list" />
  </v-fade-transition>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import BookListDetail from '@/components/books/lists/BookListDetail.vue'
import CreateList from '@/components/books/actions/CreateList.vue'

export default Vue.extend({
  components: { CreateList, BookListDetail },
  computed: { ...mapState('books', ['lists']) }
})
</script>
