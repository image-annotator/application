// This is a nuxtjs' axios-module configuration
import cookieParser from 'cookieparser'
import cookies from 'js-cookie'

// This is a javascript middleware which utilizes cookies and JSON web token (JWT) authentication.
export default async function ({ req, route, redirect, $axios }) {
  var isUserLoggedIn = await getAccessTokenStatus({ req, $axios })
  // Then test the url
  var urlRequiresNonAuth = route.fullPath === '/'
  if (!isUserLoggedIn && !urlRequiresNonAuth) {
    return redirect('/')
  }
  if (isUserLoggedIn && urlRequiresNonAuth) {
    return redirect('/main/label')
  }
  return Promise.resolve()
}

async function getAccessTokenStatus ({ req, $axios }) {
  // Send accessToken to backend and check it.
  let payload = {
    cookie: ''
  }

  if (process.server) {
    payload.cookie = cookieParser.parse(req.headers.cookie || '')['Authorization']
    console.log("cookie: ", payload.cookie)
  } else {
    payload.cookie = cookies.get('Authorization')
    console.log("cookie client: ", payload.cookie)
  }

  var url = '/api/user/validatesession'

  try {
    await $axios.post(url, payload).catch(error => { console.error(error); throw error })
    return true
  } catch (err) {
    return false
  }
}