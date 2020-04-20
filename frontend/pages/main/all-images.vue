<template>
  <div class="col">
    <div class="ml-4">
      <div class="row">
        <div class="col">
          <Dropdown
            class="margin-dropdown"
            :dropdown-value="dataset"
            @onDatasetChanged="changeDataset"
          />
        </div>
      </div>
      <div :key="updateUI" class="row animated fadeIn" style="margin-top: -1rem;">
        <div class="col">
          <div style="display: flex">
            <h5 class="title users-margin">
              {{ dataset }} All Images:
              <span v-if="dataset === 'Choose Folder'" style="margin-left: 20px; font-size: 0.85rem;">
                Choose Folder First 
              </span>
            </h5>
            <button v-if="dataset !=='Choose Folder'" class="btn-white margin-download" @click="downloadZIP()">
              {{ dataset }}.zip
              <i class="ml-3 mt-1 fas fa-download" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import datasetMethods from '~/mixins/outputs/datasetMethods'
import Dropdown from '~/components/dropdown/Dropdown'

export default {
  components: {
    Dropdown
  },
  mixins: [datasetMethods],
  data () {
    return {
      isOutputViewer: true,
      isLabeled: false,
      standard: 'coco',
      search: ''
    }
  },
  methods: {
    downloadZIP() {
      this.$swal.fire({
        title: 'Downloading',
        text: 'Please wait...',
        allowOutsideClick: false,
        allowEscapeKey: false,
        onOpen: async () => {
          this.$swal.showLoading()
          var filename = this.dataset + '.zip'
          var element = document.createElement('a')
          
          var url = 'api/image/downloadzip/' + this.dataset
          var response = await this.$axios.get(url, {
            responseType: 'arraybuffer'
          }).catch((error) => alert(error))

          var blob = new Blob([response.data], {type: 'application/zip'})
          
          element.setAttribute('href', URL.createObjectURL(blob))
          element.setAttribute('download',filename)
          element.style.display = 'none'

          document.body.appendChild(element)
          element.click()
          document.body.removeChild(element)

          this.$swal.close()
        }
      })
    } 
  }
}
</script>

<style scoped>
  
  .btn-white {
    background: #fff;
        -webkit-box-shadow: 2px 5px 5px 0px rgba(0,0,0,0.15);
        -moz-box-shadow: 2px 5px 5px 0px rgba(0,0,0,0.15);
    box-shadow: 2px 5px 5px 0px rgba(0,0,0,0.15);
    border: 0;
    border-radius: 0.3rem;
    overflow: hidden;
    cursor: pointer;
    color: #1E889B;
    margin-top: 2.8rem;
    padding-left: 1.5rem;
    padding-right: 1rem;
  }

  .btn-white:hover {
    background-color: #F7F7F7;
  }

  .margin-download {
    margin-left: 2.25rem;
  }

  .dropdown {
    color: #1E889B;
  }

  .margin-dropdown {
    margin-top: 3.5rem;
    margin-left: -0.1rem;
  }

</style>