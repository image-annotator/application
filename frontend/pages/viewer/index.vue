<template>
  <div class="viewer-background">
    <div class="btn-close-section">
      <button 
        @click="closeViewer()"
        type="button"
        class="btn-sm btn-light btn-close-text mt-2"
        aria-label="Close"> 
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="viewer-wrapper center center-horizontal">
      <img class="image" :src="imageURL">
    </div>
    <div class="btn-section">
      <button type="button" class="btn-lg btn-dark btn-text"> Save Image </button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imageURL: '/'
    }
  },
  methods: {
    closeViewer() {
      this.$router.push('/main/label')
    }
  },
  mounted() {
    this.imageURL = this.$route.query.url
  }
}
</script>

<style scoped>
  .image {
     max-width: 85vw;
     max-height: 85vh;
     border-width: thin;
  }

  .viewer-wrapper {
    height: 87vh;
    width: 100vw;
  }

  .viewer-background {
    height: 100vh;
    background-color: #E4E4E4;
  }

  .center-horizontal {
    justify-content: center;
  }

  .btn-section {
    text-align: right;
    margin-right: 15px;
    margin-top: -10px;
  }

  .btn-text { 
    font-size: 0.85rem;
    /* font-family: 'Open Sans Bold'; */
  }

  .btn-close-text {
    font-size: 1.2rem;
  }

  .btn-close-section {
    text-align: right;
    margin-right: 1px;
    margin-top: -7px;
  }

  

</style>