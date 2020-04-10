<template>
  <Label :key="dataset" :dataset="dataset">
    <Dropdown :dropdown-value="dataset" @onDatasetChanged="changeDataset" />
  </Label>
</template>

<script>

import Label from '~/components/label/Label'
import Dropdown from '~/components/dropdown/Dropdown'

export default {
  components: {
    Label,
    Dropdown
  },
  data () {
    return {
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