<template>
  <v-dialog v-model="dialog" max-width="330">
    <template #activator="{ on }">
      <v-btn icon color="error" v-on="on" @click.prevent>
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
    <v-card :loading="loading">
      <v-card-title>Delete List</v-card-title>
      <v-card-text>
        Are you sure you want to delete this list?
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="dialog = false">cancel</v-btn>
        <v-btn color="error" @click="$emit('submit', done)">delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: { loading: Boolean },
  data: () => ({ dialog: false }),
  methods: {
    done() {
      this.dialog = false
    }
  }
})
</script>
