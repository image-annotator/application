// This is a nuxtjs' axios-module configuration

import cookieParser from 'cookie-parser'
import cookies from 'js-cookie'

import { frontendURL } from '~/config.js'

export default function ({ $axios, req, redirect, route }) {
  // Set all headers with Authorization header on request
  $axios.onRequest((config) => {
    var token = ''
    var user_id = ''
    if (process.server) {
      token = cookieParser.parse(req.headers.cookie || '')['Authorization']
      user_id = cookieParser.parse(req.headers.cookie || '')['user_id']
    } else {
      token = cookies.get('Authorization')
      user_id = cookies.get('user_id')
    }
    config.headers.common['Authorization'] = token
    config.headers.common['user_id'] = user_id
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401 || code === 429) {
      if (process.server) {
        if (route.fullPath !== '/auth') {
          redirect('/auth')
        }
      } else {
        if (window.location.pathname !== '/auth') {
          window.location.href = frontendURL + '/auth'
        }
      }
    } else if (code === 500) {
      if (process.server) {
        if (route.fullPath !== '/auth/activate/500') {
          // redirect('/auth/activate/500')
        }
      } else {
        if (window.location.pathname !== '/auth/activate/500') {
          // window.location.href = frontendURL + '/auth/activate/500'
        }
      }
    }
  })
}