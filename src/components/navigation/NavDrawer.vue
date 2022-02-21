<template>
  <v-navigation-drawer app permanent clipped>
    <v-list nav flat>
      <v-list-item v-for="route in routes" :key="route.name" :to="route.path">
        <v-list-item-icon>
          <v-icon>{{ route.meta.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ route.meta.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
import { routes } from '@/router'

export default Vue.extend({
  data: () => ({
    routes: routes.filter(r => r.meta && r.meta.nav)
  })
})
</script>
