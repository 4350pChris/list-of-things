<template>
  <v-row v-if="list" dense>
    <v-col cols="12">
      <header-item :count="list.items.length" :description="list.description" :title="list.name">
        <template #append>
          <v-list-item-action>
            <edit-list :value="list">
              <template #activator="{ on }">
                <v-btn large icon v-on="on">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
            </edit-list>
          </v-list-item-action>
        </template>
      </header-item>
    </v-col>
    <v-col>
      <v-fade-transition group tag="div" class="row">
        <v-col v-for="item in list.items" :key="item" cols="12" sm="6" lg="4" xl="3">
          <v-lazy>
            <book-detail-card :list="list" :value="item" outlined />
          </v-lazy>
        </v-col>
      </v-fade-transition>
    </v-col>
  </v-row>
  <v-row v-else align="center" justify="center" style="min-height: 80vh;">
    <v-progress-circular indeterminate size="60" />
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import BookDetailCard from '@/components/books/detail/BookDetailCard.vue'
import EditList from '@/components/books/actions/EditList.vue'
import HeaderItem from '@/components/shared/lists/HeaderItem.vue'
import { BookList } from '@/store/books'
import { mapGetters } from 'vuex'
export default Vue.extend({
  components: { HeaderItem, EditList, BookDetailCard },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters('books', ['listById']),
    list(): BookList {
      return this.listById(this.value)
    }
  }
})
</script>
