<template>
  <add-to-list :value="lists" @add="addToList">
    <template #append>
      <v-divider />
      <create-list>
        <template #activator="{ on }">
          <v-btn block text color="primary" v-on="on" @click.stop>create list</v-btn>
        </template>
      </create-list>
    </template>
  </add-to-list>
</template>

<script lang="ts">
import Vue from 'vue'
import AddToList from '@/components/shared/lists/actions/AddToList.vue'
import CreateList from '@/components/books/actions/CreateList.vue'
import { BookList } from '@/store/books'
import { mapState } from 'vuex'
export default Vue.extend({
  components: { AddToList, CreateList },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  computed: { ...mapState('books', ['lists']) },
  methods: {
    async addToList(list: BookList) {
      try {
        await this.$store.dispatch('books/addItem', { list, item: this.value })
      } catch (e) {
        alert(e)
      }
    }
  }
})
</script>
