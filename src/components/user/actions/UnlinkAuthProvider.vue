<template>
  <v-dialog v-model="dialog" width="350">
    <template #activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-link-variant-off</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Unlink this account?</v-card-title>
      <v-card-text v-if="last">
        This is the only linked account. Are you sure?
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="dialog = false">Cancel</v-btn>
        <v-btn text color="error" @click="unlink">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
export default Vue.extend({
  props: {
    provider: {
      type: String,
      required: true
    }
  },
  data: () => ({ dialog: false }),
  computed: {
    ...mapState(['user']),
    last(): boolean {
      return this.user.providerData.length === 1
    }
  },
  methods: {
    async unlink() {
      try {
        await this.$store.dispatch('unlinkProvider', this.provider)
      } catch (e) {
        alert(e)
      } finally {
        this.dialog = false
      }
    }
  }
})
</script>
