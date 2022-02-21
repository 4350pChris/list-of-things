<template>
  <v-app>
    <nav-bar />
    <template v-if="user !== null">
      <nav-drawer v-if="$vuetify.breakpoint.mdAndUp" />
      <bottom-nav v-else />
    </template>
    <v-content>
      <v-container fluid>
        <v-fade-transition mode="out-in">
          <router-view />
        </v-fade-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import NavBar from './components/navigation/NavBar.vue'
import NavDrawer from './components/navigation/NavDrawer.vue'
import BottomNav from './components/navigation/BottomNav.vue'

export default Vue.extend({
  components: { NavBar, NavDrawer, BottomNav },
  data: () => ({ colorWatcher: window.matchMedia('(prefers-color-scheme: dark)') }),
  computed: { ...mapState(['user']) },
  created() {
    this.colorWatcher.addListener(this.onDarkChanged)
  },
  destroyed() {
    this.colorWatcher.removeListener(this.onDarkChanged)
  },
  methods: {
    onDarkChanged(e: MediaQueryListEvent) {
      this.$vuetify.theme.dark === e.matches
    }
  }
})
</script>
