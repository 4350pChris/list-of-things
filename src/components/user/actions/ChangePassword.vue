<template>
  <v-dialog v-model="dialog" width="400">
    <template #activator="{ on }">
      <v-btn v-bind="$attrs" v-on="on">change password</v-btn>
    </template>
    <v-card>
      <v-card-title>Change Password</v-card-title>
      <v-card-text>
        <v-form v-model="valid">
          <v-text-field v-model="oldPassword" required type="password" label="Old Password" />
          <password-field v-model="newPassword" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="dialog = false">cancel</v-btn>
        <v-btn :disabled="!valid" color="primary" @click="confirm">change password</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import PasswordField from '@/components/user/inputs/PasswordField.vue'
export default Vue.extend({
  components: { PasswordField },
  data: () => ({ newPassword: '', oldPassword: '', dialog: false, valid: false }),
  methods: {
    async confirm() {
      try {
        await this.$store.dispatch('changePassword', { newPassword: this.newPassword, oldPassword: this.oldPassword })
      } catch (e) {
        alert(e)
      } finally {
        this.dialog = false
      }
    }
  }
})
</script>
