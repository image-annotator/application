<template>
  <div class="col">
    <div class="ml-4">
      <div class="row">
        <div class="col users-margin">
            <h5 class="title">Image ID: {{ id }}</h5>            
        </div>
      </div>
      <br>
      <div class="row">
          <div class="col">
            <button class="btn-action btn-white" @click="downloadJSON()">
                JSONFile.json
                <i class="ml-3 mt-1 fas fa-download" />
            </button>
          </div>
      </div>
      <br>
      <div class="row">
          <div class="col">
              <div class="json-container">
                  <div class="json-data">
                    <h6>{{json}}</h6>
                  </div>
                  <br>
                  <button class="btn-action btn-right" @click="closeJSONViewer()">
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
export default {
//   props: {
//     imageID
//   },
  data () {
    return {
      id: '',
      name: '',
      json: {}
    }
  },
  methods:{
    closeJSONViewer() {
      this.$router.push('/main/json')
    },
    async getLabelByID(){
      var url = 'api/label/imagequery/'+ this.id
      var response = await this.$axios(url).catch(error => console.log(error))
      if(response && response.status === 200){
        return response.data.data
      }else{
        return null
      }
    },
    downloadJSON(){
      var filename = this.name.split('.',1)+'_JSONFile.json'
      var element = document.createElement('a')
      var text = JSON.stringify(this.json)
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
      element.setAttribute('download',filename)
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    }
  },
  async mounted() {
    this.id = this.$route.query.id
    this.name = this.$route.query.name
    this.json = await this.getLabelByID()
    
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
  }

  .json-container{
      /* background: #e2e2e2; */
      width: 50%;
      /* border-radius: 0.5rem; */
  }

  .json-data{
      background: #e2e2e2;
      font-family: 'Courier New', Courier, monospace;
      border-radius: 0.5rem;
      height: 15rem;
      padding-left: 1.5rem;
      padding-top: 1rem;
      overflow-y:scroll;
      word-wrap:break-word;
  }
</style>