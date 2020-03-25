<template>
  <div class="col">
    <div class="ml-4">
      <div class="row">
        <div class="col">
          <h5 class="title users-margin"> 
            Choose Images
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
            <Images
              :image-i-d="labs.name"
              :image-u-r-l="labs.image"
            />
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
import Images from '~/components/view/Images'

export default {
  components: {
    Images
  },
  data () {
    return {
      edit: [
        { name: 'sdfdosfhdauofhd', image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1159990/pike-place.jpg'},
        { name: 'sdfudjfijdieesi', image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1159990/pike-place.jpg'},
        { name: 'sdsfjifjdifjdid', image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1159990/pike-place.jpg'},
        { name: 'ssdsidinnddsass', image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1159990/pike-place.jpg'},
        { name: '93893ashdjhfuff', image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1159990/pike-place.jpg'},
        { name: '28948suduhduhfg', image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1159990/pike-place.jpg'},
        { name: '23454edjfidjfdf', image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1159990/pike-place.jpg'},
        { name: 'dsdssifjir84443', image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1159990/pike-place.jpg'},
        { name: '2343fndjnfdjnjd', image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1159990/pike-place.jpg'}
      ],
      search: ''
    }
  },
  methods: {

  },
  computed: {
      filterImages: function(){
          return this.edit.filter((labs) => {
              return labs.name.match(this.search);
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
</style>