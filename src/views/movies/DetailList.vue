<template>
  <v-row v-if="list" dense>
    <v-col cols="12">
      <header-item :description="list.description" :title="list.name" :count="list['total_results']">
        <template #append>
          <v-list-item-action class="ml-n12">
            <edit-list :value="list.id">
              <template #activator="{ on }">
                <v-btn large icon v-on="on">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
            </edit-list>
          </v-list-item-action>
          <v-list-item-action class="ml-auto">
            <v-btn class="align-self-center" :icon="$vuetify.breakpoint.smAndDown" text @click="wide = !wide">
              <v-fade-transition group hide-on-leave>
                <v-icon key="icon" :left="$vuetify.breakpoint.mdAndUp">{{ icon }}</v-icon>
              </v-fade-transition>
              <span v-if="$vuetify.breakpoint.mdAndUp">view</span>
            </v-btn>
          </v-list-item-action>
        </template>
      </header-item>
    </v-col>
    <v-col>
      <v-fade-transition group tag="div" class="row">
        <v-col v-for="movie in list.results" :key="movie.id" sm="6" lg="4" xl="3">
          <v-lazy>
            <movie-detail :removable="true" :list-id="id" :movie="movie" outlined :wide="wide" />
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
import { mapGetters } from 'vuex'
import EditList from '@/components/movies/actions/EditList.vue'
import MovieDetail from '@/components/movies/MovieDetail.vue'
import HeaderItem from '@/components/shared/lists/HeaderItem.vue'
export default Vue.extend({
  components: { HeaderItem, EditList, MovieDetail },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data: () => ({ wide: false }),
  computed: {
    ...mapGetters('movies', ['listById']),
    token(): string {
      return this.$store.state.auth?.tmdb?.token
    },
    list() {
      return this.listById(this.id)
    },
    icon(): string {
      return this.wide ? 'mdi-file-image' : 'mdi-image-size-select-actual'
    }
  },
  created() {
    this.$store.dispatch('movies/fetchDetailList', this.id).catch(e => alert(e))
  }
})
</script>
