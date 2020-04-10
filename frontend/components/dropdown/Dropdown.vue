<template>
  <div :key="dataReady">
    <vue-dropdown
      ref="dropdown"
      :config="config"
      @setSelectedOption="setNewSelectedOption($event)"
    />
  </div>
</template>

<script>
export default {
  props: {
    isUpload: {
      type: Boolean,
      default: false
    },
    dropdownValue: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      config: {
        options: [],
        width: 200,
        placeholder: "Choose folder",
        backgroundColor: "white",
        textColor: "#1E889B",
        border: ""
      },
      folder: [],
      dataReady: false
    }
  },
  async created () {
    await this.getOptions()
  },
  methods: {
    async getOptions() {
      var urlGet = '/api/image/datasets'
      const response = await this.$axios.get(urlGet).catch((error) => console.error(error))
      if (response.data.status === "success") {
        response.data.data.forEach((dataset) => {
          var key = "value"
          var obj = {}
          obj[key] = dataset
          this.config.options.push(obj)
        })
      }
      if (this.dropdownValue) {
        this.config.placeholder = this.dropdownValue
      }
      this.dataReady = true
    },
    async setNewSelectedOption(selectedOption) {
      this.config.placeholder = selectedOption.value
      this.dataset = selectedOption.value
      this.$emit("onDatasetChanged", this.dataset)
    }
  }
}
</script>