<template lang="">
  <div>
    <div class="row q-pt-md">
      <div class="col text-center">
         <q-icon name="token" class="text-teal pointer" style="font-size: 5.4em;" @click="carouselToken = true" size="xl">
           <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
             <strong>TESTER TOKEN JWT</strong>
          </q-tooltip>
         </q-icon>
      </div>
    </div>
     <q-dialog v-model="carouselToken">
      <q-carousel
        transition-prev="slide-right"
        transition-next="slide-left"
        swipeable
        animated
        v-model="slide"
        control-color="primary"
        navigation-icon="radio_button_unchecked"
        navigation
        padding
        height="400px"
        class="bg-white shadow-1 rounded-borders"
      >
        <q-carousel-slide :name="1" class="column no-wrap flex-center bg-dark">
          <a href="https://jwt.io/" target="_blank">
          <q-btn round color="pink-10" icon="pageview" size="20px">
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
             <strong>CLICK URL PAGE JWT FOR TESTING</strong>
            </q-tooltip>
          </q-btn>
          </a>
          <div class="q-mt-md text-center text-white">
            <b>JASON WEB TOKEN</b> are an open, industry standard RFC 7519 method for representing <br>
            <p>claims securely between two parties.</p><br>
            <p>JWT.IO allows you to decode, verify and generate JWT.</p><br>

          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="2" class="column no-wrap flex-center bg-gray-3">
          <q-btn round color="black" icon="content_copy" size="20px" @click="copyToken">
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
             <strong>Copy TOKEN</strong>
            </q-tooltip>
          </q-btn>
          <div class="q-mt-md text-center">
            <b>TOKEN</b> take it only for testing purposes verify that the token is valid by<br>
            <p>adding it in the section of <b>ENCODED</b></p><br>
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="3" class="column no-wrap flex-center bg-dark">
          <q-btn round color="pink-10" icon="content_copy" size="20px" @click="copyPublicKey">
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
             <strong>Copy PUBLIC KEY SSH</strong>
            </q-tooltip>
          </q-btn>
          <div class="q-mt-md text-center text-white">
            <b>PUBLIC KEY SSH</b> take it only for testing purposes verify that the token is valid by<br>
            <p>adding it in the section of <b>VERIFY SIGNATURE</b> next to Public key or Certificate</p><br>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { SessionStorage } from 'quasar'
import { Notificacion } from '../javascript/notification.js'

export default defineComponent({
  setup () {
    const carouselToken = ref(false)
    const slide = ref(1)

    const copyToken = () => {
      const text = String(SessionStorage.getItem('token'))
      navigator.clipboard.writeText(text).then(function () {
        Notificacion('TOKEN to copy was successful!', 'dark')
      }, function (err) {
        console.error('Async: Could not copy text: ', err)
      })
    }

    const copyPublicKey = () => {
      const text = '-----BEGIN PUBLIC KEY----- MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCwoEOTGMNSoNujpo1GJdpzfw6BmD8P6YAfTia2ifjN6ncRvMnBYdXAXJtyO9HksY0Cp00rfFo0oZtUcZBSuOnHY8an1wA8w7u3osWu5ctcYpBTxpBYm+e5hfAV2+qKKuLoOHY0GFLeBX+zBvfSdUphvfUvy9+/oDV1V/kqFY7XwwIDAQAB -----END PUBLIC KEY-----'
      navigator.clipboard.writeText(text).then(function () {
        Notificacion('PUBLIC KEY SSH to copy was successful!', 'pink-10')
      }, function (err) {
        console.error('Async: Could not copy text: ', err)
      })
    }

    return {
      copyToken,
      copyPublicKey,
      carouselToken,
      slide
    }
  }
})
</script>
