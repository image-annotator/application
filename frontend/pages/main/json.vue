<template>
  <div class="col">
    <div class="ml-4">
      <div class="row">
        <div class="col-3">
            <h5 class="title users-margin">Complete JSON</h5>
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
          <b-col v-for="labs in filterImages" v-bind:key="labs">
          <div id="container">
            <nuxt-link :to="{ path: '/main/json-view', query: {id: labs.ImageID, name: labs.Filename}}">
              <Images
              :imageID="labs.ImageID"
              :imageURL="labs.ImagePath"
              ></Images>
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

export default {
  components: {
    Images
  },
  mixins: [getAllLabeledImages],
  data () {
    return {
      // edit: [
      //   { name: 'sdfdosfhdauofhd', image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1159990/pike-place.jpg', json: '{id:1}'},
      //   { name: 'ssasdassfggfgfd', image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1159990/pike-place.jpg', json: '{id:1}'},
      //   { name: 'aaaaaaaaaaaaaas', image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1159990/pike-place.jpg', json: '{id:1}'},
      //   { name: 'ssssss222222222', image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1159990/pike-place.jpg', json: '{id:1}'},
      //   { name: 'ssssssssssssscs', image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1159990/pike-place.jpg', json: '{id:1}'},
      //   { name: 'wwwwweerr4r4444', image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1159990/pike-place.jpg', json: '{id:1}'},
      //   { name: 'asdefgtgbddfere', image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1159990/pike-place.jpg', json: '{id:1}'},
      //   { name: 'dsdfthththhttht', image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1159990/pike-place.jpg', json: '{id:1}'},
      //   { name: '111111111122222', image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1159990/pike-place.jpg', json: '{id:1}'},
      //   { name: '3333333333erees', image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1159990/pike-place.jpg', json: '{id:1}'},
      //   { name: '23243rfdvvvvvvv', image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1159990/pike-place.jpg', json: '{id:1}'},
      //   { name: 'sssssssssdw2434', image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1159990/pike-place.jpg', json: '{id:1}'}
      // ],
      search: '',
    }
  },
  methods: { 
    async getAllLabel(){
      var url = '/api/label'
      var response = await this.$axios(url).catch(error => console.log(error))
      if (response && response.status === 200) {
        return response.data.data
      } else {
        return null
      }
    },
    async downloadJSON() {
      var filename = 'JSONFile.json'
      var element = document.createElement('a')
      var label = await this.getAllLabel()
      var text = JSON.stringify(label)
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

</style>