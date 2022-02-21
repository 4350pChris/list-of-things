<template>
  <v-dialog v-model="dialog" max-width="300">
    <template #activator="{ on }">
      <v-btn text color="error" :icon="$vuetify.breakpoint.smAndDown" v-on="on">
        <v-icon class="d-md-none">mdi-close-box-multiple</v-icon>
        <span class="d-none d-md-flex">Remove</span>
      </v-btn>
    </template>
    <v-card :loading="loading">
      <v-card-title>Delete Item?</v-card-title>
      <v-card-text>Are you sure you want to remove this item from the list?</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="dialog = false">cancel</v-btn>
        <v-btn color="error" @click="$emit('submit', done)">remove</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    loading: Boolean
  },
  data: () => ({ dialog: false }),
  methods: {
    done() {
      this.dialog = false
    }
  }
})
</script>
