<template>
  <v-text-field
    :value="value"
    :rules="passwordRules"
    label="Password"
    type="password"
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
    passwordRules: [
      (v: string) => !!v || 'Password is required',
      (v: string) => v.length > 9 || 'Password needs at least 10 characters.'
    ]
  })
})
</script>
