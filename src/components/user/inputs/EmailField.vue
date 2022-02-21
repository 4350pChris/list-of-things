<template>
  <v-text-field
    :value="value"
    :rules="emailRules"
    label="E-Mail"
    type="email"
    required
    @input="$emit('input', $event)"
  />
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data: () => ({
    emailRules: [
      (v: string) => !!v || 'E-mail is required',
      (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ]
  })
})
</script>
