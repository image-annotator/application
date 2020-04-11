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
      <div :key="updateUI" class="row animated fadeIn">
        <div class="col">
          <div style="display: flex">
            <h5 class="title users-margin">
              {{ dataset }} COCO file:
              <span v-if="!dataset" style="margin-left: 20px; font-size: 0.85rem;">
                Choose Folder First 
              </span>
            </h5>
            <button v-if="dataset" class="btn-white margin-download" @click="downloadJSON()">
              {{ dataset }}.json
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
        title="JSON Per Image"
        viewer-u-r-l="/main/output-view"
        :output="{type: 'json', standard: standard}"
      />
    </div>
  </div>
</template>

<script>
import getAllLabeledImages from '~/mixins/image/getAllLabeledImages.js'
import  { backendURL } from '~/config.js'
import Label from '~/components/label/Label'
import Dropdown from '~/components/dropdown/Dropdown'

export default {
  components: {
    Label,
    Dropdown
  },
  mixins: [getAllLabeledImages],
  data () {
    return {
      dataset: '',
      isOutputViewer: true,
      isLabeled: true,
      imagesObj: {},
      backendURL: backendURL,
      standard: 'coco',
      search: '',
      updateUI: false
    }
  },
  mounted () {
    if (this.$route.query.dataset) {
      this.dataset = this.$route.query.dataset
      this.updateUI = !this.updateUI
    }
  },
  methods: {
    changeDataset (newDataset) {
      this.dataset = newDataset
      this.updateUI = !this.updateUI
    },
    async getCOCOJSON () {
      var infoObj = this.getInfoObj()
      var licensesArr = this.getLicensesArr()
      // Component "global" objects:
      await this.assignImagesObj()
      var categoriesAndAnnotations = await this.getCategoriesAndAnnotationsArr()
      // Convert object to array
      var imagesArr = []
      Object.keys(this.imagesObj).forEach((imageID) => {
        imagesArr.push(this.imagesObj[imageID])
      })
      var COCOJSON = {
        info: infoObj,
        licenses: licensesArr,
        categories: categoriesAndAnnotations.categories,
        images: imagesArr,
        annotations: categoriesAndAnnotations.annotations
      }
      return COCOJSON
    },
    getInfoObj () {
      var curYear = new Date().getFullYear()
      var infoObj = {
        year: curYear,
        version: "",
        description: this.dataset,
        contributor: "",
        url: "",
        date_created: ""
      }
      return infoObj
    },
    getLicensesArr () {
      var licensesArr = [{
        id: 1,
        name: "",
        url: ""
      }]
      return licensesArr
    },
    async assignImagesObj () {
      this.imagesObj = {}
      var allImages = await this.getAllImages()
      if (allImages) {
        allImages.forEach(async (image) => {
          var url = this.backendURL + '/api/' + image.ImagePath
          var imageMeta = await this.getImageMeta(url)
          var singleImageObj = {
            id: image.ImageID,
            width: imageMeta.naturalWidth,
            height: imageMeta.naturalHeight,
            file_name: image.Filename,
            license: 1,
            date_captured: image.UpdatedAt
          }
          this.imagesObj[image.ImageID] = singleImageObj
        })
      }
    },
    async getAllLabel(){
      var url = '/api/label'
      var response = await this.$axios(url).catch(error => console.log(error))
      if (response && response.status === 200) {
        var rawJSON = response.data.data
        return rawJSON
      } else {
        return null
      }
    },
    async getLabelContentByID (contentID) {
      var url = '/api/content/' + contentID
      var response = await this.$axios(url).catch(error => console.log(error))
      if (response && response.status === 200) {
        return response.data.data
      } else {
        return null
      }
    },
    async getCategoriesAndAnnotationsArr () {
      var allLabels = await this.getAllLabel()
      var categoriesArr = await this.getCategoriesArr(allLabels)
      var annotationsArr = await this.getAnnotationsArr(allLabels)
      return {
        categories: categoriesArr,
        annotations: annotationsArr
      }
    },
    async getCategoriesArr (allLabels) {
      var categoriesArr = []
      for (var labelIdx in allLabels) {
        var label = allLabels[labelIdx]
        if (this.imagesObj[label["image_id"]]) {
          // Category
          var labelResponse = await this.getLabelContentByID(label["label_content_id"])
          var categoryObj = {
            id: label["label_content_id"],
            name: labelResponse["content_name"],
            supercategory: ""
          }
          categoriesArr.push(categoryObj)
        }
      }
      return categoriesArr
    },
    async getAnnotationsArr (allLabels) {
      var annotationsArr = []
      for (var labelIdx in allLabels) {
        var label = allLabels[labelIdx]
        if (this.imagesObj[label["image_id"]]) {
          // Annotations
          var x_top_left = Math.round(label.label_x_center - (0.5 * label.label_width))
          var y_top_left = Math.round(label.label_y_center - (0.5 * label.label_height))
          var annotationObj = {
            area: Math.round(label.label_width * label.label_height),
            iscrowd: 0,
            image_id: label.image_id,
            bbox: [x_top_left, y_top_left, Math.round(label.label_width), Math.round(label.label_height)],
            category_id: label.label_content_id,
            id: label.label_id
          }
          annotationsArr.push(annotationObj)
        }
      }
      return annotationsArr
    },
    async getImageMeta(url) {
      return new Promise((resolve, reject) => {
        let img = new Image()
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = url
      })
    },
    async getAllImages() {
      var url = '/api/image'
      const response = await this.$axios.get(url, {
        params: {
          PerPage: 999999,
          Page: 1,
          search: "",
          Labeled: this.isLabeled,
          Dataset: this.dataset
        }
      }).catch((error) => console.error(error))
      if (response.data.data) {
        return response.data.data.images
      } else {
        return null
      }
    },
    async downloadJSON() {
      var filename = this.dataset + '.json'
      var element = document.createElement('a')
      // var label = await this.getAllLabel(this.standard)
      var COCOJSON = await this.getCOCOJSON()
      console.log("COCO: ", COCOJSON)
      var text = JSON.stringify(COCOJSON, 0, 5)
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
      element.setAttribute('download',filename)
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
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
    margin-left: -0.775rem;
  }

</style>