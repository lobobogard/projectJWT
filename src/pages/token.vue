<template lang="">
<q-page class="bg-grey-2">
  <div>
    <div class="row q-pt-xl">
      <div class="col text-center">
         <q-icon name="token" class="text-teal" style="font-size: 4.4em;" />
      </div>
    </div>
    <div class="row q-mt-md justify-center text-white">
      <div class="col-9 bg-teal-10 shadow-3 q-pl-md q-pr-sm q-pt-sm q-pb-sm">
        JWT (JSON Web Token) is a standard that is within the RFC 7519 document.<br>
        A) The options buttons are generated for testing purposes.<br>
        B) The token refresh is generated in a cookie handling an expiration time of 10 minutes for the purpose of separate tests. It handles other extra safeguards such as Httponly and SameSmite of strict type.<br>
        C) The token is stored in the session storage has 5 minutes of expiration.
      </div>
    </div>
    <div class="row q-mt-md justify-center text-white">
      <div class="col-9 bg-red-10 shadow-3 q-pl-md q-pr-sm q-pt-sm q-pb-sm">
        Json web token will be eliminated by means of the white list which is used when the refresh token has been hacked by which it will no longer be able to generate a token at the time of expiration
      </div>
    </div>
    <div class="row q-mt-md justify-center text-white">
      <div class="col-9 bg-pink-10 shadow-3 q-pl-md q-pr-sm q-pt-sm q-pb-sm">
       When eliminating the session storage token, if we try to select a route, they will notify us that we must log out and log in again to obtain a new token.
      </div>
    </div>
    <div class="row q-mt-md justify-center text-white">
      <div class="col-9 bg-purple-10 shadow-3 q-pl-md q-pr-sm q-pt-sm q-pb-sm">
        Json web token will be eliminated by means of the white list which is used when the refresh token has been hacked by which it will no longer be able to generate a token at the time of expiration
      </div>
    </div>
    <div class="row q-pt-xl">
      <div class="col-12 col-md-4 text-center q-mb-sm">
        <q-btn color="red-10" label="delete token refresh JWT" />
      </div>
      <div class="col-12 col-md-4 text-center q-mb-sm">
        <q-btn color="pink-10" label="delete token session JWT" @click="deleteTokenSession"/>
      </div>
      <div class="col-12 col-md-4 text-center q-mb-sm">
        <q-btn color="purple-10" label="desactive notification refresh JWT" />
      </div>
    </div>
  </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { SessionStorage } from 'quasar'
import { Notificacion } from '../javascript/notification.js'

export default defineComponent({
  setup () {
    const deleteTokenSession = () => {
      SessionStorage.set('token', '')
      Notificacion('The token is deleted from the session storage', 'pink-10')
    }

    return {
      deleteTokenSession
    }
  }
})
</script>
