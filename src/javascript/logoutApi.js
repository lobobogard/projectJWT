
import { api } from 'boot/axios'
import { SessionStorage } from 'quasar'
import { Notificacion } from '../javascript/notification.js'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default function () {
  const router = useRouter()
  const $store = useStore()

  const logout = () => {
    sessionToken.value = ''
    apiLogout()
    router.push({ name: 'index' })
  }

  const apiLogout = () => {
    const data = {
      token: SessionStorage.getItem('token')
    }
    api.post('logout', data, { withCredentials: true }).then((response) => {
      SessionStorage.set('token', '')
      // console.log(response.data)
      Notificacion('Logout success', 'cyan-10')
    }).catch(() => {
      Notificacion('Server error communicating with support', 'red-10')
    })
  }

  const sessionToken = computed({
    get: () => {
      return $store.state.jwt.sessionToken
    },
    set: val => {
      $store.commit('jwt/sessionJwt', val)
    }
  })

  return { logout, sessionToken }
}
