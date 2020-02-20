// This is a nuxtjs' axios-module configuration
import cookieParser from 'cookieparser'
import cookies from 'js-cookie'

// This is a javascript middleware which utilizes cookies and JSON web token (JWT) authentication.
export default async function ({ req, route, redirect, store, $axios }) {

  var userData = await getUserInfo({ req, $axios })
  var isUserLoggedIn = !!userData
  console.log("userData: ", userData)

  // Then test the url
  var urlRequiresNonAuth = route.fullPath === '/'
  if (!isUserLoggedIn && !urlRequiresNonAuth) {
    store.dispatch(('user/deleteUser'))
    return redirect('/')
  }
  
  if (isUserLoggedIn && urlRequiresNonAuth) {
    return redirect('/main/label')
  }

  store.dispatch('user/setUser', userData)

  return Promise.resolve()
}

async function getUserInfo ({ req, $axios }) {
  // Send accessToken to backend and check it.
  let payload = {
    cookie: ''
  }
  
  if (process.server) {
    payload.cookie = cookieParser.parse(req.headers.cookie || '')['Authorization']
  } else {
    payload.cookie = cookies.get('Authorization')
  }
  
  var url = '/api/user/validatesession'
    
  try {
    var response = await $axios.post(url, payload).catch(error => { console.error(error); throw error })
    return response.data.data
  } catch (err) {
    return false
  }
}