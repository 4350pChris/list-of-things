<template>
  <v-dialog v-model="dialog" max-width="500">
    <template #activator="{ on }">
      <slot name="activator" v-bind="{ on }" />
    </template>
    <v-card :loading="loading">
      <v-card-title v-text="title" />
      <v-card-text>
        <v-form v-model="valid">
          <v-text-field v-model="list.name" label="Name" :rules="[notEmpty]" />
          <v-text-field v-model="list.description" label="Description" />
          <slot name="append-form" :list="list" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="dialog = false">cancel</v-btn>
        <slot name="submit" :done="done" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true
    },
    loading: Boolean,
    value: {
      type: Object,
      required: false,
      default: () => ({ name: '', description: '' })
    }
  },
  data: () => ({
    dialog: false,
    valid: false,
    notEmpty: (v: string) => !!v || 'Required.'
  }),
  computed: {
    list: {
      get() {
        return this.value
      },
      set(v: object) {
        this.$emit('input', v)
      }
    }
  },
  watch: {
    value(v: object) {
      this.list = v
    }
  },
  methods: {
    done() {
      this.dialog = false
    }
  }
})
</script>
