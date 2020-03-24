<template>
  <div class="col">
    <div class="ml-4">
      <div class="row">
        <div class="col users-margin">
            <h5 class="title">Image ID {{ name }}</h5>            
        </div>
      </div>
      <br>
      <div class="row">
          <div class="col">
            <button class="btn-action btn-white">
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
                      {{ json }}
                  </div>
                  <br>
                  <button class="btn-action btn-right" @click="closeJSONViewe()">
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
      name: '',
      json: ''
    }
  },
  methods:{
    closeJSONViewe() {
      this.$router.push('/main/json')
    }
  },
  mounted() {
    this.name = this.$route.query.name
    this.json = this.$route.query.json
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
  }
</style>