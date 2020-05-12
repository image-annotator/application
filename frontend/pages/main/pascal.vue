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
              {{ dataset }} Pascal file:
              <span v-if="!dataset" style="margin-left: 20px; font-size: 0.85rem;">
                Choose Folder First 
              </span>
              <span v-else-if="empty" style="margin-left: 20px; font-size: 0.85rem;">
                No Images Found
              </span>
            </h5>
            <button v-if="dataset && !empty" class="btn-white margin-download" @click="downloadXML()">
              {{ dataset }}.xml
              <i class="ml-3 mt-1 fas fa-download" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="dataset" class="row" style="margin-top: -1.5rem;">
      <Label
        :key="updateUI"
        :is-output-viewer="isOutputViewer"
        :is-labeled="isLabeled"
        :dataset="dataset"
        title="XML Per Image"
        viewer-u-r-l="/main/output-view"
        :output="{type: 'xml', standard: standard}"
        @onEmpty="handleOnEmpty"
      />
    </div>
  </div>
</template>


<script>
import datasetMethods from '~/mixins/outputs/datasetMethods'
import pascalMethods from '~/mixins/outputs/pascalMethods'
import Convert from 'xml-js'
import Label from '~/components/label/Label'
import Dropdown from '~/components/dropdown/Dropdown'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

export default {
  components: {
    Label,
    Dropdown
  },
  mixins: [datasetMethods, pascalMethods],
  data () {
    return {
      isOutputViewer: true,
      isLabeled: true,
      standard: 'pascal',
      search: '',
    }
  },
  methods: {
    async getPascalXML () {
      this.pascalJSON = {}
      var allImages = await this.getAllImages()
      if (allImages) {
        // Generate zip file
        var zip = new JSZip()
        // Get information about labels
        var allLabels = await this.getAllLabel()
        // These methods are available in mixins
        await this.setImagesAttr(allImages)
        await this.getObjectsAttr(allLabels)
        for (var key in this.pascalJSON) {
          var xml = this.convertToXML(this.pascalJSON[key])
          zip.file(this.pascalJSON[key].filename + '.xml', xml)
        }
        zip.generateAsync({type:'blob'}).then((content) => {
          saveAs(content, this.dataset)
        })
      }
    },
    async setImagesAttr (allImages) {
      for (var imageIdx in allImages) {
        var image = allImages[imageIdx]
        await this.setSingleImageAttr(image, this.dataset)
      }
    },
    convertToXML(json){
      var option = {
        compact: true,
        spaces: 4,
        attributes_key: 'annotation'
      }
      var result = Convert.json2xml(JSON.stringify(json,0,4), option)
      return result
    },
    async downloadXML() {
      await this.getPascalXML()
    } 
  }
}
</script>

<style scoped>

  .form-title, .form-content, .btn-content {
    font-size: 0.85rem;
    color: #1E889B;
    letter-spacing: 0.025rem;

    font-family: 'Open Sans Regular';
  }

  .btn-action .btn-content {
    color: white;
    margin-top: 5px; 
    margin-left: -5px;
  }

  .form-title-margin {
    margin-top: -5px;
  }
  
  #container {
    grid-area: main;
    align-self: center;
    justify-self: center;
    width: 18rem;
  }

  .btn-white{
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


  .standard-dropdown{
    background: yellow;
    width: 200px;
    overflow-x: hidden;
    border-radius: 25px;
    -webkit-box-shadow: 2px 5px 5px 0px rgba(0,0,0,0.15);
        -moz-box-shadow: 2px 5px 5px 0px rgba(0,0,0,0.15);
    box-shadow: 2px 5px 5px 0px rgba(0,0,0,0.15);
  }

  .dropdown{
    color: #1E889B;
  }

  .margin-download {
    margin-left: 2.25rem;
  }

  .margin-dropdown {
    margin-top: 3.5rem;
    margin-left: -0.1rem;
  }

</style>