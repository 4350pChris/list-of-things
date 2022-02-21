<template>
  <v-menu>
    <template #activator="{ on }">
      <v-btn text :icon="$vuetify.breakpoint.smAndDown" v-on="on">
        <v-icon class="d-md-none">mdi-playlist-plus</v-icon>
        <span class="d-none d-md-flex">add to list</span>
      </v-btn>
    </template>
    <v-list>
      <v-subheader>My Lists</v-subheader>
      <v-list-item v-for="list in value" :key="list.id" @click="$emit('add', list)">
        <v-list-item-content>
          <v-list-item-title v-text="list.name" />
        </v-list-item-content>
      </v-list-item>
      <slot name="append" />
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    value: {
      type: Array,
      required: true
    }
  }
})
</script>
