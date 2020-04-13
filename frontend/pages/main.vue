<template>
  <div class="container-fluid">
    <div class="row">
      <Navbar :username="user.username" :role="user.role" />
      <nuxt-child style="margin-left: 250px;" />
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/root/Navbar'
import { mapGetters } from 'vuex'

export default {
  components: {
    Navbar
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser'
    }) 
  }
}
</script>