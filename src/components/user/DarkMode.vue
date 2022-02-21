<template>
  <v-list-item>
    <v-list-item-action>
      <v-checkbox v-model="darkMode"></v-checkbox>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title>Dark Mode</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data: () => ({ colorWatcher: window.matchMedia('(prefers-color-scheme: dark)') }),
  computed: {
    darkMode: {
      get() {
        return this.$store.state.settings.dark
      },
      set(dark: boolean) {
        this.$store.dispatch('saveSettings', { dark })
      }
    }
  }
})
</script>
