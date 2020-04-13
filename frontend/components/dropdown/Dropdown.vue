<template>
  <div :key="dataReady">
    <b-dropdown :text="dataset">
      <b-dropdown-item
        v-for="(item, idx) in config.options" :key="idx"
        @click.native="setNewSelectedOption(item)"
      > 
        {{ item.value }}
      </b-dropdown-item>
    </b-dropdown>
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
      },
      dataset: '',
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
    if (this.dropdownValue) {
      this.dataset = this.dropdownValue
    } else {
      this.dataset = "Choose Folder"
      
      if (!this.isFolderNotExist()) {
        if (!this.isUpload) {
          this.dataset = this.config.options[0].value
        }
      }
      this.$emit("onDatasetChanged", this.dataset)
    }
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
    },
    isFolderNotExist () {
      if (this.isUpload) {
        return this.config.options.length <= 1
      } else {
        return this.config.options.length <= 0
      }
    },
    async setNewSelectedOption(selectedOption) {
      this.dataset = selectedOption.value
      if (this.dataset === "Add New Folder") {
        this.createNewFolder()
      }
      this.$emit("onDatasetChanged", this.dataset)
    },
    createNewFolder() {
      this.$swal.fire({
        title: "New folder name: ",
        input:'text',
        inputValidator: (value) => {
          if (!value) {
            return 'You need to write something!'
          } else {
            this.dataset = value
            this.$emit("onDatasetChanged", this.dataset)
          }
        },
        confirmButtonColor: '#11616F',
        showCancelButton: true
      }).then((result) => {
        
        if (!result.value) {
          this.dataset = "Choose Folder"
          
        }
      })
    },
  }
}
</script>

<style>
  .dropdown .btn {
    background-color: #1E889B;
    color: white;
    font-family: "Open Sans Bold";
    border: 0;
    border-radius: 7px;
  }
</style>