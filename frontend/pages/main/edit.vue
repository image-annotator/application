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
            v-model="images"
            type="text"
            class="form-control form-border field-length form-content"
            placeholder="Search for Images ID..."
            name="imagesID"
          >
        </div>
      </div>
      <br>
      <b-row> 
          <b-col v-for="labs in label" v-bind:key="labs">
          <div id="container">
              <Images
              :imageID="labs.name"
              :imageURL="labs.image"
              ></Images>
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
      images: ''
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
      label: [
        { name: 'labelled1', image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1159990/pike-place.jpg'},
        { name: 'labelled2', image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1159990/pike-place.jpg'},
        { name: 'labelled3', image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1159990/pike-place.jpg'},
        { name: 'labelled4', image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1159990/pike-place.jpg'},
        { name: 'labelled5', image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1159990/pike-place.jpg'},
        { name: 'labelled6', image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1159990/pike-place.jpg'},
        { name: 'labelled7', image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1159990/pike-place.jpg'},
        { name: 'labelled8', image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1159990/pike-place.jpg'},
        { name: 'labelled9', image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1159990/pike-place.jpg'}
      ]
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