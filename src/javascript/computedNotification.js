import { useStore } from 'vuex'
import { computed } from 'vue'
import { Notificacion } from '../javascript/notification.js'

export default function () {
  const $store = useStore()

  const showNotification = computed({
    get: () => {
      return $store.state.jwt.showNotification
    },
    set: val => {
      $store.commit('jwt/showNotification', val)
    }
  })

  const notifiactionRefreshTokenShow = () => {
    if (showNotification.value) {
      Notificacion('token regenerate', 'purple-10')
    }
  }

  return { notifiactionRefreshTokenShow }
}

// import computedNotification from '../javascript/computedNotification'
// const { notifiactionRefreshTokenShow } = computedNotification()
