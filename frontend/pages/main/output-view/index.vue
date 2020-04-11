<template>
  <div class="col">
    <div class="ml-4">
      <div class="row">
        <div class="col users-margin">
          <h5 class="title">
            Image Name: {{ name }}
          </h5>            
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col">
          <button class="btn-action btn-white" @click="downloadOutput()">
            {{ name }}.{{ type }}
            <i class="ml-3 mt-1 fas fa-download" />
          </button>
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col">
          <div class="json-container">
            <div v-if="type === 'json'" class="json-data">
              <json-viewer 
                :value="json"
                :expand-depth="5"
              />
            </div>
            <div v-if="type === 'xml'" id="xml" />
            <button class="btn-action btn-right" @click="closeOutputViewer()">
              <i class="ml-3 mt-1 fa fa-angle-left" />
              Back
            </button>
            <br>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Convert from 'xml-js'
import cocoMethods from '~/mixins/outputs/cocoMethods'
import pascalMethods from '~/mixins/outputs/pascalMethods'
export default {
  mixins: [cocoMethods, pascalMethods],
  data () {
    return {
      type: '',
      id: '',
      name: '',
      standard: '',
      json: {},
      xml: '',
      config:{
        indentation: '   ',
        stripComments: true,
        collapseContent: true,
        lineSeparator: '\n'
      },
      dataset: '',
      imagesObj: {}
    }
  },
  async mounted() {
    this.type = this.$route.query.type
    this.name = this.$route.query.name
    this.standard = this.$route.query.standard
    this.dataset = this.$route.query.dataset
    this.id = this.$route.query.id

    if (this.type === 'xml') {
      this.json = await this.getPascalXMLPerImage()
      this.format()
    } else {
      this.json = await this.getCOCOJSONPerImage()
    }
  },
  methods:{
    async getCOCOJSONPerImage () {
      var infoObj = this.getInfoObj()
      var licensesArr = this.getLicensesArr()

      await this.assignImagesObj(this.id)

      var categoriesAndAnnotations = await this.getCategoriesAndAnnotationsArrPerImage()
      var COCOJSON = {
        info: infoObj,
        licenses: licensesArr,
        images: [this.imagesObj[this.id]],
        categories: categoriesAndAnnotations.categories,
        annotations: categoriesAndAnnotations.annotations
      }
      return COCOJSON
    },
    async getCategoriesAndAnnotationsArrPerImage () {
      var allLabelsPerImage = await this.getLabelByImageID(this.id)
      var categoriesArr = await this.getCategoriesArr(allLabelsPerImage)
      var annotationsArr = await this.getAnnotationsArr(allLabelsPerImage)
      return {
        categories: categoriesArr,
        annotations: annotationsArr
      }
    },
    async getPascalXMLPerImage () {
      this.pascalJSON = {}
      var newPascalJSON = {"annotation": []}
      var allImages = await this.getAllImages()
      if (allImages) {
        var label = await this.getLabelByImageID(this.id)
        await this.setImagesAttr(allImages)
        await this.getObjectsAttr(label)
        for (var key in this.pascalJSON) {
          newPascalJSON["annotation"].push(this.pascalJSON[key])
        }
        return newPascalJSON
      }
    },
    async setImagesAttr (allImages) {
      for (var imageIdx in allImages) {
        var image = allImages[imageIdx]
        if (image.ImageID === this.id) {
          await this.setSingleImageAttr(image, this.dataset)
        }
      }
    },
    closeOutputViewer() {
      if (this.type === 'json'){
        this.$router.push({path: '/main/coco', query:{ dataset: this.dataset }})
      } else {
        this.$router.push({path: '/main/pascal', query:{ dataset: this.dataset }})
      }
    },
    async downloadOutput(){
      var filename = this.name
      var element = document.createElement('a')
      
      if (this.type == 'json') {
        this.json = await this.getCOCOJSONPerImage()
        filename += '.json'
        var text = JSON.stringify(this.json,0,4)
        element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(text))
      }
      else {
        this.json = await this.getPascalXMLPerImage()
        console.log("XML AWAIT: ", this.json)
        console.log("CONVERT: ", this.convertToXML(this.json))
        filename += '.xml'
        element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(this.convertToXML(this.json)))
      }
      element.setAttribute('download', filename)
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    },
    convertToXML(json){
      var option = {
        compact: true,
        spaces: 4
      }
      var result = Convert.json2xml(JSON.stringify(json,0,4),option)
      return result
    },
    format(){
      var xml = this.convertToXML(this.json)
      xml = xml.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/ /g, '&nbsp;').replace(/\n/g,'<br />')
      // console.log("xml: ", this.json)
      // var xml = this.convertToXML(this.json)
      var mydiv = document.getElementById("xml")
      if (mydiv) {
        console.log("1")
        mydiv.innerHTML += xml
        console.log("2")
      }
      console.log("3")
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
    /* margin-top: 2.8rem; */
    padding-left: 1.5rem;
    padding-right: 1rem;
  }

  .btn-right{
      float: right;
      background: #fff;
        -webkit-box-shadow: 2px 5px 5px 0px rgba(0,0,0,0.15);
        -moz-box-shadow: 2px 5px 5px 0px rgba(0,0,0,0.15);
    box-shadow: 2px 5px 5px 0px rgba(0,0,0,0.15);
    border: 0;
    border-radius: 0.3rem;
    overflow: hidden;
    cursor: pointer;
    color: #1E889B;
    /* margin-top: 2.8rem; */
    /* padding-left: 1.5rem; */
    padding-right: 1rem;
    margin-top: 1rem;
  }

  .json-container{
      /* background: #e2e2e2; */
      width: 70%;
      /* border-radius: 0.5rem; */
  }

  .json-data{
      font-family: 'Courier New', Courier, monospace;
      border-radius: 0.5rem;
      height: 20rem;
      overflow-y:scroll;
      word-wrap:break-word;
        -webkit-box-shadow: 2px 5px 5px 0px rgba(0,0,0,0.15);
        -moz-box-shadow: 2px 5px 5px 0px rgba(0,0,0,0.15);
    box-shadow: 2px 5px 5px 0px rgba(0,0,0,0.15);
  }

  #xml{
    height: 20rem;
    overflow-y: scroll;
    padding-left: 1.5rem;
    padding-top: 1rem;
      -webkit-box-shadow: 2px 5px 5px 0px rgba(0,0,0,0.15);
        -moz-box-shadow: 2px 5px 5px 0px rgba(0,0,0,0.15);
    box-shadow: 2px 5px 5px 0px rgba(0,0,0,0.15);
  }
</style>