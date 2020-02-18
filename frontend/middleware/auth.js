// This is a javascript middleware which utilizes cookies and JSON web token (JWT) authentication.

export default async function ({ route, redirect, $axios }) {
  var isUserLoggedIn = await getAccessTokenStatus({ $axios })
  // Then test the url
  var urlRequiresNonAuth = route.fullPath === ''
  if (!isUserLoggedIn && !urlRequiresNonAuth) {
    return redirect('')
  }
  if (isUserLoggedIn && urlRequiresNonAuth) {
    return redirect('/main')
  }
  return Promise.resolve()
}

async function getAccessTokenStatus ({ $axios }) {
  // Send accessToken to backend and check it.
  var url = '/api/user/show'
  try {
    var response = await $axios.get(url).catch(error => { console.error(error); throw error })
    return response.meta.status_code === "200"
  } catch (err) {
    return false
  }
}