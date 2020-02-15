<template>
  <div class="container-fluid">
    <div class="row">
      <nuxt-child />
    </div>
  </div>
</template>

import { mapGetters } from 'vuex'

import Navbar from '~/components/root/Navbar'