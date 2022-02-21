<template>
  <v-list-item>
    <v-list-item-avatar tile>
      <tmdb-image contain />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title v-text="account.username" />
    </v-list-item-content>
    <v-list-item-action>
      <unlink-tmdb />
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import Vue from 'vue'
import UnlinkTmdb from '@/components/user/actions/UnlinkTmdb.vue'
import TmdbImage from '@/components/shared/TmdbImage.vue'
import { Prop } from 'vue/types/options'

export default Vue.extend({
  components: { UnlinkTmdb, TmdbImage },
  props: {
    account: {
      type: Object as Prop<firebase.UserInfo>,
      required: true
    }
  }
})
</script>
