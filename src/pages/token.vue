<template lang="">
<q-page class="bg-grey-2">
  <div>
    <carruselToken />
    <div class="row q-mt-md justify-center text-white">
      <div class="col-9 bg-teal-10 shadow-3 q-pl-md q-pr-sm q-pt-sm q-pb-sm">
        JWT (JSON Web Token) is a standard that is within the RFC 7519 document.<br>
        A) Click on the top token icon to test the token on its official page.<br>
        B) The options buttons are generated for testing purposes.<br>
        C) The <b>"token refresh"</b> is generated in a cookie handling an expiration time of <b>10 minutes</b> for the purpose of separate tests. It handles other extra safeguards such as Httponly and SameSmite of strict type.<br>
        D) The <b>"token"</b> is stored in the session storage has <b>5 minutes</b> of expiration after expire will be renove the token and cookie and not logout for that.
      </div>
    </div>
    <div class="row q-mt-md justify-center text-white">
      <div class="col-9 bg-red-10 shadow-3 q-pl-md q-pr-sm q-pt-sm q-pb-sm">
        <p>Json web token will be eliminated by of the <b><a href="https://curity.io/resources/learn/jwt-best-practices/" target="_blank" style="color:white;">WHITE LIST</a></b> which is used when the refresh token has been hacked by which it will no longer be able to generate a token at the time of expiration</p>
      </div>
    </div>
    <div class="row q-mt-md justify-center text-white">
      <div class="col-9 bg-pink-10 shadow-3 q-pl-md q-pr-sm q-pt-sm q-pb-sm">
       When eliminating the session storage token, if we try to select an option in the menu, it will instantly logout us from the system.
      </div>
    </div>
    <div class="row q-mt-md justify-center text-white">
      <div class="col-9 bg-purple-10 shadow-3 q-pl-md q-pr-sm q-pt-sm q-pb-sm">
        <p>In this option you can be notified every time the <b>"token regenerate"</b> when is expire and refresh the token, checking that it is not logout by refresh the token.</p>
      </div>
    </div>
    <div class="row q-pt-xl">
      <div class="col-12 col-md-4 text-center q-mb-sm">
        <q-btn color="red-10" label="delete token refresh JWT" @click="deleteTokenRefreshRedis"/>
      </div>
      <div class="col-12 col-md-4 text-center q-mb-sm">
        <q-btn color="pink-10" label="delete token session JWT" @click="deleteTokenSession"/>
      </div>
      <div class="col-12 col-md-4 text-center q-mb-sm">
        <q-btn color="purple-10 pointer" label="" @click="desactiveNotification" >
          <label v-if="!showNotification" class="pointer">active notification refresh token</label>
          <label v-if="showNotification" class="pointer">desactive notification refresh token</label>
        </q-btn>
      </div>
    </div>
  </div>
  </q-page>
</template>

<script>
import { defineComponent, computed, ref } from 'vue'
import { SessionStorage } from 'quasar'
import { Notificacion } from '../javascript/notification.js'
import carruselToken from 'components/carruselToken.vue'
import { useStore } from 'vuex'
import { api } from 'boot/axios'

export default defineComponent({
  components: {
    carruselToken
  },
  setup () {
    const $store = useStore()
    const carouselToken = ref(false)

    const deleteTokenRefreshRedis = () => {
      api.post('deleteTokenRefreshRedis', '', { withCredentials: true }).then((response) => {
        Notificacion(response.data, 'red-10')
      }).catch((error) => {
        if (error.response.status === 401) {
          Notificacion(error.response.data, 'red-10')
        } else {
          Notificacion('Server error communicating with support', 'red-10')
        }
      })
    }

    const deleteTokenSession = () => {
      SessionStorage.set('token', '')
      Notificacion('The token is deleted from the session storage', 'pink-10')
    }

    const desactiveNotification = () => {
      showNotification.value = !showNotification.value
      const mensaje = showNotification.value ? 'The notification token is active' : 'The notification token is desactive'
      Notificacion(mensaje, 'purple-10')
    }

    const showNotification = computed({
      get: () => {
        return $store.state.jwt.showNotification
      },
      set: val => {
        $store.commit('jwt/showNotification', val)
      }
    })

    return {
      carouselToken,
      showNotification,
      deleteTokenRefreshRedis,
      deleteTokenSession,
      desactiveNotification
    }
  }
})
</script>

<style lang="css">
 .pointer {
   cursor: pointer
 }
</style>
