<template>
  <v-bottom-navigation app grow shift>
    <v-btn v-for="route in routes" :key="route.name" :to="route.path">
      <span>{{ route.meta.title }}</span>
      <v-icon>{{ route.meta.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
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
