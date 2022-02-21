<template>
  <v-list-item three-line>
    <v-list-item-avatar>
      <user-avatar :src="user.photoURL" />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title v-text="user.displayName" />
      <v-list-item-subtitle v-text="user.email" />
      <v-list-item-subtitle>{{ providerName }} Account</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <unlink-auth-provider :provider="user.providerId" />
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import Vue from 'vue'
import UserAvatar from './UserAvatar.vue'
import UnlinkAuthProvider from '@/components/user/actions/UnlinkAuthProvider.vue'
import { Prop } from 'vue/types/options'
import * as firebase from 'firebase/app'

export default Vue.extend({
  components: { UserAvatar, UnlinkAuthProvider },
  props: {
    user: {
      type: Object as Prop<firebase.UserInfo>,
      required: true
    }
  },
  data: () => ({
    names: {
      [firebase.auth.GoogleAuthProvider.PROVIDER_ID]: 'Google',
      [firebase.auth.EmailAuthProvider.PROVIDER_ID]: 'E-Mail'
    }
  }),
  computed: {
    providerName(): string {
      return this.names[this.user.providerId]
    }
  }
})
</script>
