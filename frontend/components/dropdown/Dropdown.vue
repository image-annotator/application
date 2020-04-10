<template>
  <div :key="dataReady">
    <vue-dropdown
      ref="dropdown"
      class="dropdown"
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
    if (this.isUpload) {
      this.config.options.push({
        value: "Add New Folder"
      })
    }
    await this.getOptions()
    this.dataReady = true
  },
  methods: {
    async getOptions() {
      var urlGet = '/api/image/datasets'
      const response = await this.$axios.get(urlGet).catch((error) => console.error(error))
      if (response.data.status === "success") {
        if (response.data.data) {
          response.data.data.forEach((dataset) => {
            var key = "value"
            var obj = {}
            obj[key] = dataset
            this.config.options.push(obj)
          })
        }
      }
      if (this.dropdownValue) {
        this.config.placeholder = this.dropdownValue
      } else {
        if (!this.isFolderNotExist()) {
          if (this.isUpload) {
            this.config.placeholder = this.config.options[1].value
          } else {
            this.config.placeholder = this.config.options[0].value
          }
          this.dataset = this.config.placeholder
          this.$emit("onDatasetChanged", this.dataset)
        }
      }
    },
    isFolderNotExist () {
      if (this.isUpload) {
        return this.config.options.length <= 1
      } else {
        return this.config.options.length <= 0
      }
    },
    async setNewSelectedOption(selectedOption) {
      this.config.placeholder = selectedOption.value
      this.dataset = selectedOption.value
      if (this.dataset === "Add New Folder") {
        this.createNewFolder()
      }
      this.$emit("onDatasetChanged", this.dataset)
    },
    createNewFolder() {
      this.$swal.fire({
        title: "New folder name",
        input:'text',
        inputValidator: (value) => {
          if (!value) {
            return 'You need to write something!'
          } else {
            this.config.placeholder = value
            this.dataset = value
            this.$emit("onDatasetChanged", this.dataset)
          }
        },
        confirmButtonColor: '#11616F',
        showCancelButton: true
      }) 
    },
  }
}
</script>

<style scoped>
  .dropdown {
    -webkit-box-shadow: 2px 5px 5px 0px rgba(0,0,0,0.15);
    -moz-box-shadow: 2px 5px 5px 0px rgba(0,0,0,0.15);
    box-shadow: 2px 5px 5px 0px rgba(0,0,0,0.15);
  }
</style>