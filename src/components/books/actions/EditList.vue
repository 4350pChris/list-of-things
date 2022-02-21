<template>
  <list-dialog v-model="list" title="Edit List">
    <template #activator="{ on }">
      <slot name="activator" :on="on">
        <v-btn v-if="icon || icon === ''" large icon v-on="on" @click.prevent>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn v-else text color="primary" v-on="on" @click.prevent>
          edit
        </v-btn>
      </slot>
    </template>
    <template #submit="{ done }">
      <v-btn color="primary" @click="save(done)">save</v-btn>
    </template>
  </list-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { BookList } from '@/store/books'
import { Prop } from 'vue/types/options'
import ListDialog from '@/components/shared/lists/actions/ListDialog.vue'
export default Vue.extend({
  components: { ListDialog },
  props: {
    icon: {
      type: [String, Boolean],
      default: ''
    },
    value: {
      type: Object as Prop<BookList>,
      required: true
    }
  },
  data: () => ({ loading: false, list: {} }),
  watch: {
    value(v: object) {
      this.list = v
    }
  },
  created() {
    this.list = { ...this.value, id: this.value.id }
  },
  methods: {
    async save(done: () => void) {
      this.loading = true
      try {
        await this.$store.dispatch('books/saveList', this.list)
        done()
      } catch (e) {
        alert(e)
      } finally {
        this.loading = false
      }
    }
  }
})
</script>
