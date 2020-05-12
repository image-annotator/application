<template>
  <client-only>
    <Label
      :key="dataset"
      :title="title"
      viewer-u-r-l="/viewer/index-edit"
      :is-labeled="isLabeled"
      :is-delete="isDelete"
      :dataset="dataset"
    >
      <Dropdown :dropdown-value="dataset" @onDatasetChanged="changeDataset" />
    </Label>
  </client-only>
</template>

<script>
import Label from '~/components/label/Label'
import Dropdown from '~/components/dropdown/Dropdown'
export default {
  components: {
    Label,
    Dropdown
  },
  props: {
    title: {
      type: String,
      default: "Delete Unlabeled Images"
    },
    isLabeled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isDelete: true,
      dataset: ''
    }
  },
  mounted () {
    if (this.$route.query.dataset) {
      this.dataset = this.$route.query.dataset
    }
  },
  methods: {
    changeDataset (newDataset) {
      this.dataset = newDataset
    }
  }
}
</script>