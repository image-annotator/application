<template>
  <div class="col">
    <div class="ml-4">
      <div class="row">
        <div class="col-3">
          <h5 class="title users-margin">
            Complete XML
          </h5>
        </div>
        <button class="btn-white" @click="downloadXML()">
          XMLFile.xml
          <i class="ml-3 mt-1 fas fa-download" />
        </button>
      </div>
    </div>
    <div class="row">
      <Label
        :is-output-viewer="isOutputViewer"
        :is-labeled="isLabeled"
        title="XML Per Image"
        viewer-u-r-l="/main/output-view"
      />
    </div>
  </div>
</template>


<script>
import getAllLabeledImages from '~/mixins/image/getAllLabeledImages.js'
import  { backendURL } from '~/config.js'
import Convert from 'xml-js'
import Label from '~/components/label/Label'
export default {
  components: {
    Label
  },
  mixins: [getAllLabeledImages],
  data () {
    return {
      isOutputViewer: true,
      isLabeled: true,
      backendURL: backendURL,
      standard: 'pascal',
      search: ''
    }
  },
  computed: {
    filterImages: function(){
      return this.labeledImages.filter((labs) => {
        return labs.Filename.match(this.search)
      })
    }
  },
  methods: {
    async getAllLabelJSON(standard){
      var url = '/api/label'
      var response = await this.$axios(url).catch(error => console.log(error))
      if (response && response.status === 200) {
        var rawJSON = response.data.data
        return this.standardJSON(rawJSON, standard)
      } else {
        return null
      }
    },
    standardJSON(rawJSON, standard){
      var JSONstandard = []
      rawJSON.forEach(element => {
        var area = element.label_width * element.label_height,
          x_top_left = element.label_x_center - (0.5 * element.label_width),
          y_top_left = element.label_y_center - (0.5 * element.label_height),
          x_bot_right = element.label_x_center + (0.5 * element.label_width),
          y_bot_right = element.label_y_center - (0.5 * element.label_height),
          json = {
            id: element.label_id,
            image_id: element.image_id,
            category_id: element.label_content_id,
            area: area,
            bounding_box: {
            },
            created_at: element.created_at,
            updated_at: element.updated_at
          }
        if(standard == "coco"){
          json.bounding_box.x_top_left = x_top_left
          json.bounding_box.y_top_left = y_top_left
          json.bounding_box.width = element.label_width
          json.bounding_box.height = element.label_height
          JSONstandard.push(json)
        }else if(standard == "pascal"){
          json.bounding_box.x_top_left = x_top_left
          json.bounding_box.y_top_left = y_top_left
          json.bounding_box.x_bot_right = x_bot_right
          json.bounding_box.y_bot_right = y_bot_right
          JSONstandard.push(json)
        }
      })
      return JSONstandard
    },
    convertToXML(json){
      var option = {
        compact: true,
        spaces: 4
      }
      var result = Convert.json2xml(JSON.stringify(json,0,4),option)
      return result
    },
    async downloadXML() {
      var filename = 'XMLFile.xml'
      var element = document.createElement('a')
      var label = await this.getAllLabelJSON(this.standard)
      var xml = this.convertToXML(label)
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(xml))
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

</style>