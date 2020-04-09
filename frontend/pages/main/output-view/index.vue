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
            {{ type.toUpperCase() }}File.{{ type }}
            <i class="ml-3 mt-1 fas fa-download" />
          </button>
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col">
          <div class="json-container">
            <div class="json-data" v-if="type === 'json'">
              <json-viewer 
              :value="json"
              :expand-depth=5
              >
            </json-viewer>
            </div>
            <div id="xml" v-if="type === 'xml'"></div>
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
import JsonViewer from 'vue-json-viewer'
import Convert from 'xml-js'
// import XMLFormatter from 'xml-formatter'
export default {
//   props: {
//     imageID
//   },
  components: {
    JsonViewer
  },
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
      }
    }
  },
  async mounted() {
    this.type = this.$route.query.type
    this.id = this.$route.query.id
    this.name = this.$route.query.name
    this.standard = this.$route.query.standard
    this.json = await this.getLabelByID(this.standard)
    // this.xml = XMLFormatter(this.convertToXML(),this.config)
    this.xml = this.convertToXML()
    if(this.type === 'xml'){
      this.Format()  
    }
        
  },
  methods:{
    closeOutputViewer() {
      if(this.type === 'json'){
        this.$router.push('/main/json')
      }else{
        this.$router.push('/main/xml')
      }
      
    },
    async getLabelByID(standard){
      var url = 'api/label/imagequery/'+ this.id
      var response = await this.$axios(url).catch(error => console.log(error))
      if(response && response.status === 200){
        var rawJSON = response.data.data
        return this.standardJSON(rawJSON,standard)
      }else{
        return null
      }
    },
    standardJSON(rawJSON,standard){
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
    downloadOutput(){
      var filename = this.name.split('.',1)+'_JSONFile.json'
      var element = document.createElement('a')
      
      if(this.type == 'json'){
        var text = JSON.stringify(this.json,0,4)
        element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(text))
      }
      else{
        element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(this.xml))
      }
      element.setAttribute('download',filename)
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    },
    convertToXML(){
      var option = {
        compact: true,
        spaces: 4
      }
      var result = Convert.json2xml(JSON.stringify(this.json,0,4),option)
      return result
    },
    Format(){
      var xml = this.xml.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/ /g, '&nbsp;').replace(/\n/g,'<br />')
      var mydiv = document.getElementById("xml")
      mydiv.innerHTML += xml
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