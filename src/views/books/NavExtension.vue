<template>
  <v-dialog v-model="dialog" fullscreen transition="slide-y-transition">
    <template #activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </template>
    <v-app-bar dark>
      <v-btn icon @click="dialog = false">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <search-info />
      <v-text-field
        v-model="search"
        class="ml-2"
        :loading="loading"
        label="Search For Books"
        hide-details
        clearable
        single-line
      />
    </v-app-bar>
    <v-card>
      <v-row justify="center" class="mx-0">
        <v-col cols="12" md="10" lg="8">
          <v-skeleton-loader :loading="!items && loading" type="list-item-avatar-three-line@10">
            <v-list three-line>
              <v-slide-y-transition group>
                <book-list-item v-for="item in items" :key="item.id" :value="item" />
              </v-slide-y-transition>
            </v-list>
          </v-skeleton-loader>
          <v-col>
            <v-pagination v-if="pages" v-model="page" :length="pages" total-visible="7" />
          </v-col>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { query } from '@/api/books/volumes'
import BookListItem from '@/components/books/detail/BookListItem.vue'
import SearchInfo from '@/components/books/SearchInfo.vue'
import { debounceTime, pluck, switchMap, filter, share, mapTo, startWith, map } from 'rxjs/operators'
import { merge, combineLatest } from 'rxjs'
export default Vue.extend({
  components: { BookListItem, SearchInfo },
  data: () => ({
    dialog: false,
    search: '',
    page: 1
  }),
  subscriptions() {
    const search$ = this.$watchAsObservable('search').pipe(
      debounceTime(300),
      pluck<object, string>('newValue'),
      filter(text => text.length > 2)
    )
    const startIndex$ = this.$watchAsObservable('page').pipe(
      startWith({ newValue: 1 }),
      pluck<object, number>('newValue'),
      map(v => (v - 1) * 10)
    )
    const combined$ = combineLatest(search$, startIndex$)
    const response$ = combined$.pipe(
      switchMap(([text, startIndex]) => query(text, { startIndex, maxResults: 10 })),
      share()
    )
    const loading$ = merge(combined$.pipe(mapTo(true)), response$.pipe(mapTo(false))).pipe(startWith(false))
    return {
      search: search$,
      items: response$.pipe(pluck('items')),
      loading: loading$,
      pages: response$.pipe(
        pluck('totalItems'),
        map(v => Math.ceil(v / 10))
      )
    }
  },
  mounted() {
    this.$subscribeTo(this.$observables.search, () => (this.page = 1))
  }
})
</script>
