<template>
  <list-dialog v-model="list" :loading="loading" title="Edit Movie List">
    <template #activator="{ on }">
      <slot name="activator" :on="on">
        <v-btn text color="primary" v-on="on" @click.prevent>
          edit
        </v-btn>
      </slot>
    </template>
    <template #append-form="{ list }">
      <v-select v-model="list.sort_by" :items="sortValues" label="Sort By" />
      <v-select v-model="list.ascending" :items="sortOrder" label="Sort Order" />
      <v-checkbox v-model="list.public" label="Public" />
    </template>
    <template #submit="{ done }">
      <v-btn color="primary" @click="saveChanges(done)">save</v-btn>
    </template>
  </list-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { ListUpdateOptions, sortValues, SortValues } from '@/api/tmdb/list'
import { mapGetters } from 'vuex'
import ListDialog from '@/components/shared/lists/actions/ListDialog.vue'
export default Vue.extend({
  components: { ListDialog },
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    loading: true,
    list: {} as ListUpdateOptions,
    sortValues,
    sortOrder: [
      { text: 'Ascending', value: true },
      { text: 'Descending', value: false }
    ],
    notEmpty: (v: string) => !!v || 'Required.'
  }),
  computed: {
    ...mapGetters('movies', ['listById'])
  },
  mounted() {
    this.initList()
  },
  methods: {
    async initList() {
      this.loading = true
      let list = this.listById(this.value)
      if (list === undefined) {
        await this.$store.dispatch('movies/fetchDetailList', this.value).catch(e => alert(e))
        list = this.listById(this.value)
      }
      const { id, name, description, public: pub, sort_by } = list
      const [sort, order] = sort_by.split('.')
      const ascending = order === 'asc'
      this.list = { id, name, description, public: pub, sort_by: sort as SortValues, ascending }
      this.loading = false
    },
    async saveChanges(done: () => void) {
      this.loading = true
      try {
        await this.$store.dispatch('movies/updateList', this.list)
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
