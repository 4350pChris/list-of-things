<template>
  <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
    <template #activator="{ on }">
      <v-btn icon large v-on="on">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar>
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title class="title">Settings</v-toolbar-title>
        <v-spacer />
        <logout @click="dialog = false" />
      </v-toolbar>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="5" lg="4" xl="3">
          <v-list subheader>
            <v-subheader>Accounts Used for Sign-Up</v-subheader>
            <user-info v-for="provider in providers" :key="provider.providerId" :user="provider" />
          </v-list>
          <v-list subheader>
            <v-subheader>Other Linked Accounts</v-subheader>
            <connect-tmdb v-if="account === null" />
            <tmdb-user-info v-else :account="account" />
          </v-list>
          <v-list subheader>
            <v-subheader>Other Settings</v-subheader>
            <dark-mode />
          </v-list>
          <v-list subheader>
            <v-subheader>Account Settings</v-subheader>
            <v-list-item v-if="passwordProvider">
              <change-password text block />
            </v-list-item>
            <v-list-item>
              <delete-account block depressed color="error">delete account</delete-account>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import UserInfo from '@/components/user/UserInfo.vue'
import Logout from '@/components/user/actions/Logout.vue'
import TmdbUserInfo from '@/components/user/TmdbUserInfo.vue'
import DarkMode from '@/components/user/DarkMode.vue'
import ConnectTmdb from '@/components/user/actions/ConnectTmdb.vue'
import ChangePassword from '@/components/user/actions/ChangePassword.vue'
import DeleteAccount from '@/components/user/actions/DeleteAccount.vue'
import { mapState } from 'vuex'
import * as firebase from 'firebase/app'

export default Vue.extend({
  components: { DeleteAccount, ChangePassword, ConnectTmdb, DarkMode, Logout, UserInfo, TmdbUserInfo },
  data: () => ({ dialog: false }),
  computed: {
    ...mapState(['user', 'auth']),
    ...mapState('movies', ['account']),
    providers(): firebase.UserInfo[] {
      return this.user ? this.user.providerData : []
    },
    passwordProvider(): firebase.UserInfo | undefined {
      return this.providers.find(p => p.providerId === firebase.auth.EmailAuthProvider.PROVIDER_ID)
    }
  }
})
</script>
