<template>
  <div class="container-fluid">
    <div class="row">
      <Navbar username="Edward" role="Admin" />
      <nuxt-child />
    </div>
  </div>
</template>



<script>
// import { mapGetters } from 'vuex'
import Navbar from '~/components/root/Navbar'

export default {
  components: {
    Navbar
  } 
}
</script>