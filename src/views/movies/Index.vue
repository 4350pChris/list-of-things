<template>
  <router-view class="mx-sm-6 mx-md-8 mx-lg-12" />
</template>

<script lang="ts">
import Vue from 'vue'
import { init } from '@/store/movies'
export default Vue.extend({
  created() {
    init(this.$store).catch((e: string) => alert(e))
  }
})
</script>
