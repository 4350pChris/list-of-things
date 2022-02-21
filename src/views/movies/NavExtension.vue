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
      <v-text-field
        v-model="search"
        :items="items"
        :loading="loading"
        label="Search for movies"
        hide-details
        clearable
        single-line
      />
    </v-app-bar>
    <v-card>
      <v-row justify="center" class="mx-0">
        <v-col cols="12" md="10" lg="8">
          <v-skeleton-loader :loading="!items && loading" type="list-item-avatar-three-line@10">
            <v-list>
              <v-slide-y-transition group>
                <movie-list-item v-for="item in items" :key="item.id" :movie="item" />
              </v-slide-y-transition>
            </v-list>
          </v-skeleton-loader>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import theMovieDb from 'themoviedb-javascript-library'
import MovieListItem from '@/components/movies/MovieListItem.vue'
import { debounceTime, pluck, filter, switchMap, mapTo, startWith } from 'rxjs/operators'
import { Observable, from, merge } from 'rxjs'

export default Vue.extend({
  components: { MovieListItem },
  data: () => ({ dialog: false, search: '' }),
  computed: {
    ...mapState('movies', ['lists'])
  },
  subscriptions() {
    const search$: Observable<string> = this.$watchAsObservable('search').pipe(
      debounceTime(300),
      pluck<object, string>('newValue'),
      filter(text => text.length > 2)
    )
    const items$ = search$.pipe(
      switchMap(text =>
        from(
          new Promise((resolve, reject) =>
            theMovieDb.search.getMovie(
              { query: encodeURI(text) },
              (res: string) => resolve(JSON.parse(res).results),
              reject
            )
          )
        )
      )
    )
    return {
      items: items$,
      loading: merge(search$.pipe(mapTo(true)), items$.pipe(mapTo(false))).pipe(startWith(false))
    }
  }
})
</script>
