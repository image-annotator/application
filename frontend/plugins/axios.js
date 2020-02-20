// This is a nuxtjs' axios-module configuration
import cookieParser from 'cookieparser'
import cookies from 'js-cookie'

import { frontendURL } from '~/config.js'

export default function ({ $axios, req, redirect, route }) {
  // Set all headers with Authorization header on request
  $axios.onRequest((config) => {
    var token = ''
    if (process.server) {
      token = 'Basic ' + cookieParser.parse(req.headers.cookie || '')['Authorization']
    } else {
      token = 'Basic ' + cookies.get('Authorization')
    }
    config.headers.common['Authorization'] = token
  })

  // Handle on error
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401 || code === 429) {
      // Remove all cookies
      if (process.server) {
        if (route.fullPath !== '/') {
          redirect('/')
        }
      } else {
        if (window.location.pathname !== '/') {
          window.location.href = frontendURL + ''
        }
      }
    }
  })
}