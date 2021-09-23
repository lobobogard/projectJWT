
import { SessionStorage } from 'quasar'
import logoutApi from '../javascript/logoutApi'
import { Notificacion } from '../javascript/notification.js'
import computedNotification from '../javascript/computedNotification'
import { api } from 'boot/axios'

export default function () {
  const { logout } = logoutApi()
  const { notifiactionRefreshTokenShow } = computedNotification()

  const validateToken = () => {
    let token = SessionStorage.getItem('token')
    if (token === null) {
      refreshApiToken()
    } else {
      token = parseJwt(token)
      if (jwtExpire(token)) {
        refreshApiToken()
      }
    }
  }

  /* functions for the token */
  function jwtExpire (token) {
    if (Date.now() >= token.exp * 1000) {
      return true
    } else {
      return false
    }
  }

  function parseJwt (token) {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))

    return JSON.parse(jsonPayload)
  }

  const refreshApiToken = () => {
    const data = { token: SessionStorage.getItem('token') }
    api.post('tokenRefresh', data, { withCredentials: true }).then((response) => {
      saveTokens(response.data.token)
      notifiactionRefreshTokenShow()
    }).catch(error => {
      console.log(error.response)
      if (error.response.status === 401) {
        console.log(error.response.data)
        Notificacion(error.response.data, 'red-10')
        logout()
      } else {
        Notificacion('Server error communicating with support', 'red-10')
        logout()
      }
    })
  }

  const saveTokens = (token) => {
    SessionStorage.set('token', token)
  }

  return { validateToken }
}
