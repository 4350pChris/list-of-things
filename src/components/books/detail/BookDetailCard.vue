<template>
  <v-scale-transition hide-on-leave>
    <v-skeleton-loader v-if="!book" type="card" height="180" width="355" />
    <v-card v-else v-bind="$attrs">
      <v-container v-ripple fluid class="py-0 pl-0" @click="details = !details">
        <v-row no-gutters>
          <v-col class="pa-0" cols="auto">
            <book-image contain width="120" :value="book" />
          </v-col>
          <v-col class="px-0">
            <v-card-title style="word-break: break-word;" v-text="book.volumeInfo.title" />
            <v-card-subtitle>
              <span v-if="book.volumeInfo.authors">{{ book.volumeInfo.authors.join(', ') }}</span>
              <br />
              <span v-if="publishedDate">{{ publishedDate }}</span>
              <br />
              <span v-if="book.volumeInfo.categories">{{ book.volumeInfo.categories.join(', ') }}</span>
            </v-card-subtitle>
          </v-col>
          <v-col cols="auto" align-self="center">
            <v-icon :class="{ rotate: details }">mdi-arrow-down</v-icon>
          </v-col>
        </v-row>
      </v-container>
      <v-expand-transition>
        <v-card-text v-if="details" v-html="book.volumeInfo.description" />
      </v-expand-transition>
      <v-divider />
      <v-card-actions>
        <complete kind="book" :value="book.id" />
        <comment kind="book" :value="book.id" />
        <v-spacer />
        <rate kind="book" :value="book.id" />
        <v-spacer />
        <remove-from-list :book-id="book.id" :list="list" />
      </v-card-actions>
    </v-card>
  </v-scale-transition>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue/types/options'
import { mapGetters } from 'vuex'
import { GoogleBook } from '@/api/books/GoogleBook'
import { BookList } from '@/store/books'
import BookImage from '@/components/books/detail/BookImage.vue'
import Comment from '@/components/shared/lists/actions/Comment.vue'
import Complete from '@/components/shared/lists/actions/Complete.vue'
import Rate from '@/components/shared/lists/actions/Rate.vue'
import RemoveFromList from '@/components/books/actions/RemoveFromList.vue'

export default Vue.extend({
  components: { BookImage, Complete, Comment, Rate, RemoveFromList },
  props: {
    value: {
      type: String,
      required: true
    },
    list: {
      type: Object as Prop<BookList>,
      required: true
    }
  },
  data: () => ({ details: false, rating: 0 }),
  computed: {
    ...mapGetters('books', ['bookById']),
    book(): GoogleBook | undefined {
      return this.bookById(this.value)
    },
    publishedDate(): string {
      const date = this.book?.volumeInfo.publishedDate
      if (date === undefined) return ''
      return new Date(date).toLocaleDateString()
    }
  },
  created() {
    if (!this.book) {
      this.$store.dispatch('books/fetchBook', this.value).catch(e => alert(e))
    }
  }
})
</script>

<style scoped>
.rotate {
  transform: rotate(180deg);
}
</style>
