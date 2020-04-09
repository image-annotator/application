<template>
  <div class="col">
    <div class="ml-4">
      <div class="row">
        <div class="col-3">
          <h5 class="title users-margin">
            Complete JSON
          </h5>
        </div>
        <button class="btn-white" @click="downloadJSON()">
          JSONFile.json
          <i class="ml-3 mt-1 fas fa-download" />
        </button>
      </div>
      <div class="row">
        <div class="col">
          <h5 class="title users-margin"> 
            JSON per Image
          </h5>
        </div>
      </div>
      <br>
      <div class="row form-title-margin">
        <div class="col">
          <input
            id="imagesID"
            v-model="search"
            type="text"
            class="form-control form-border field-length form-content"
            placeholder="Search for Images ID..."
            name="imagesID"
          >
        </div>
      </div>
      <br>
      <b-row> 
        <b-col v-for="labs in filterImages" :key="labs">
          <div id="container">
            <nuxt-link :to="{ path: '/main/output-view', query: {type: 'json', id: labs.ImageID, name: labs.Filename, standard: standard}}">
              <Images
                :image-name="labs.Filename"
                :image-i-d="labs.ImageID"
                :image-u-r-l="backendURL + '/api/' + labs.ImagePath"
              />
            </nuxt-link>
            <br>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    //   search: ''
    }
  }
}
</script>

<script>
import Images from '~/components/view/Images.vue'
import getAllLabeledImages from '~/mixins/image/getAllLabeledImages.js'
import  { backendURL } from '~/config.js'
import VueDropdown from 'vue-dynamic-dropdown'
export default {
  components: {
    Images,
    VueDropdown
  },
  mixins: [getAllLabeledImages],
  data () {
    return {
      backendURL: backendURL,
      standard: 'coco',
      search: '',
    }
  },
  methods: {
    async getAllLabel(standard){
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
        if(standard === "coco"){
          json.bounding_box.x_top_left = x_top_left
          json.bounding_box.y_top_left = y_top_left
          json.bounding_box.width = element.label_width
          json.bounding_box.height = element.label_height
          JSONstandard.push(json)
        }else if(standard === "pascal"){
          json.bounding_box.x_top_left = x_top_left
          json.bounding_box.y_top_left = y_top_left
          json.bounding_box.x_bot_right = x_bot_right
          json.bounding_box.y_bot_right = y_bot_right
          JSONstandard.push(json)
        }
        
      })
      return JSONstandard
    },
    async downloadJSON() {
      var filename = 'JSONFile.json'
      var element = document.createElement('a')
      var label = await this.getAllLabel(this.standard)
      var text = JSON.stringify(label,0,5)
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
      element.setAttribute('download',filename)
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    } 
  },
  computed: {
      filterImages: function(){
          return this.labeledImages.filter((labs) => {
              return labs.Filename.match(this.search);
          });
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