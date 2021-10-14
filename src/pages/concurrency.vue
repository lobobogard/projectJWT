<template>
<q-page>
  <div>
    <div class="row justify-center">
      <div class="q-mt-xl col-3 text-white bg-pink-10 text-center rcorners">
          <label class="label">CONCURRENCY</label>
      </div>
    </div>

    <div class="row bg-orange-8 q-mx-md q-mt-xl rcorners">
      <div class="col-2 text-center q-mt-xs">
         <q-toggle v-model="email" checked-icon="mark_email_read" unchecked-icon="unsubscribe" color="pink-10" size="lg" @update:model-value="changeEmail()" >
           <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
            <strong> {{email ? "YES send email" : "NOT send email"}}</strong>
          </q-tooltip>
         </q-toggle>
      </div>
      <div class="col text-white q-mt-sm">
         The sending of 3 emails will be simulated each time a new company is generated, each email has an approximate time of diff seconds, simulating that it carries a very heavy attachment for these three receivers, remember this only working when <b>add new company</b>.
      </div>
    </div>

    <div class="row bg-teal-10 q-mx-md q-mt-xl rcorners">
      <div class="col-2 text-center q-mt-xs">
         <q-toggle v-model="concurrency" checked-icon="tips_and_updates" unchecked-icon="tips_and_updates" color="orange-10" size="lg" @update:model-value="changeConcurrency()" >
           <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
            <strong> {{concurrency ? "Active concurrency" : "Desactive concurrency"}}</strong>
          </q-tooltip>
         </q-toggle>
      </div>
      <div class="col text-white q-mt-sm">
         If we activate the concurrency we can improve the performance and increase the speed of our process of sending emails.
      </div>
    </div>

  </div>
</q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'
import catchs from '../javascript/catch'
import { Notificacion } from '../javascript/notification.js'
import { SessionStorage } from 'quasar'

export default {
  setup () {
    const { catchError } = catchs()
    const token = ref(SessionStorage.getItem('token'))
    const email = ref(false)
    const concurrency = ref(false)

    function changeEmail () {
      const postData = {
        SendEmail: email.value
      }
      api.post('email', postData, { headers: { Authorization: `Bearer ${token.value}` } }).then((response) => {
        Notificacion(response.data, 'orange-8')
      }).catch((err) => {
        alert(err)
        catchError(err)
      })
    }

    function changeConcurrency () {
      const postData = {
        concurrency: concurrency.value
      }
      api.post('concurrency', postData, { headers: { Authorization: `Bearer ${token.value}` } }).then((response) => {
        Notificacion(response.data, 'teal-10')
      }).catch((err) => {
        catchError(err)
      })
    }

    onMounted(() => {
      api.get('concurrency', { headers: { Authorization: `Bearer ${token.value}` } }).then((response) => {
        console.log(response.data)
        email.value = response.data.sendEmail
        concurrency.value = response.data.concurrency
      }).catch((err) => {
        catchError(err)
      })
    })

    return {
      token,
      email,
      concurrency,
      changeConcurrency,
      changeEmail
    }
  }
}
</script>
<style lang="css" scoped>
.rcorners {
  border-radius: 45px;
  background: #73AD21;
  padding: 8px;
}
</style>
