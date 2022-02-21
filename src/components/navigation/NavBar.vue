<template>
  <v-app-bar app dark clipped-left flat :hide-on-scroll="$vuetify.breakpoint.smAndDown">
    <v-toolbar-title class="ml-2 headline list-item">List of Things</v-toolbar-title>
    <v-spacer />
    <router-view name="extension" />
    <account-menu v-if="user" />
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import AccountMenu from '@/components/user/AccountMenu.vue'
import { mapState } from 'vuex'

export default Vue.extend({
  components: { AccountMenu },
  computed: { ...mapState(['user']) }
})
</script>
