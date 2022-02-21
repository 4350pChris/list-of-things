<template>
  <v-dialog v-model="dialog" width="350">
    <template #activator="{ on }">
      <v-btn v-bind="$attrs" v-on="on">delete account</v-btn>
    </template>
    <v-card>
      <v-card-title>Confirm Account Deletion</v-card-title>
      <v-card-text>Are you sure you want to delete your account? You will not be able to recover it.</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text color="primary" @click="dialog = false">cancel</v-btn>
        <v-btn text color="error" @click="deleteAccount">delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data: () => ({ dialog: false }),
  methods: {
    async deleteAccount() {
      try {
        await this.$store.dispatch('deleteAccount')
      } catch (e) {
        alert(e)
      }
    }
  }
})
</script>
