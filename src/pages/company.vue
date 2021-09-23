<template lang="html">
<q-page class="bg-grey-2">
  <div>
    <div class="row justify-center">
      <div class="q-mt-xl col-3 text-white bg-red-10 text-center rcorners">
          <label class="label">COMPANY</label>
      </div>
    </div>

    <div class="row q-ml-md q-mt-md">
      <div class="col-11 col-sm q-mt-md">
          <q-input v-model="data.company" color="dark" label="Company name" ref="refCompany" :rules="[val => !!val || 'Field is required']">
          <template v-slot:prepend>
            <q-icon name="location_city" color="red-10" />
          </template>
        </q-input>
      </div>
      <div class="col-11 col-sm q-mt-md marginLeft">
          <q-input v-model="data.contact" color="dark" label="Contact Name" ref="refContact" :rules="[val => !!val || 'Field is required']">
          <template v-slot:prepend>
            <q-icon name="person" color="red-10" />
          </template>
        </q-input>
      </div>
      <div class="col-11 col-sm q-mt-md q-mr-md marginLeft">
          <q-select v-model="data.country" :options="catalogueCountry" emit-value map-options option-value="ID" option-label="country" label="Country"/>
          <div class="text-red-10" style="font-size:90%;" v-if="refCountry"><label>Field is required</label></div>
      </div>
    </div>
    <div class="row q-ml-md q-mt-md">
      <div class="col-11 col-sm q-mt-md">
          <q-input v-model="data.mail" color="dark" label="Email" ref="refMail" :rules="[val => !!val || 'Field is required', isValidEmail]">
          <template v-slot:prepend>
            <q-icon name="mail" color="red-10" />
          </template>
        </q-input>
      </div>
      <div class="col-11 col-sm q-mt-md marginLeft">
          <q-input v-model.number="data.cellPhone" type="number" color="dark" label="Cell Phone" ref="refCellPhone" :rules="[val => !!val || 'Field is required']">
          <template v-slot:prepend>
            <q-icon name="stay_current_portrait" color="red-10" />
          </template>
        </q-input>
      </div>
      <div class="col-11 col-sm q-mt-md q-mr-md marginLeft">
          <q-input v-model.number="data.phone" type="number" color="dark" label="Phone" ref="refPhone" :rules="[val => !!val || 'Field is required']">
          <template v-slot:prepend>
            <q-icon name="call" color="red-10" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row justify-center q-mt-xl">
      <div class="col-4 col-sm-2">
        <q-btn :loading="loading" color="white" text-color="dark" label="" style="width: 130px" @click="send" >
          SAVE
          <template v-slot:loading>
           <q-spinner-hourglass class="on-left" />
           Saving...
           </template>
        </q-btn>
      </div>
      <div class="col-4 col-sm-2 text-center">
        <q-btn color="white" text-color="dark" label="CLEAN" style="width: 130px"/>
      </div>
    </div>
    <br>
  </div>
</q-page>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { apiToken } from 'boot/axiosToken'
// import { Notificacion } from '../javascript/notification.js'
import token from '../javascript/token'
import catchs from '../javascript/catch'
import { useStore } from 'vuex'

export default {
  setup () {
    const { catchError } = catchs()
    const { validateToken } = token()
    const $store = useStore()
    const loading = ref(false)
    const refCompany = ref(null)
    const refContact = ref(null)
    const refCountry = ref(false)
    const refMail = ref(null)
    const refCellPhone = ref(null)
    const refPhone = ref(null)
    const catalogueCountry = ref(null)
    const data = ref({
      company: '',
      contact: '',
      country: '',
      mail: '',
      cellPhone: '',
      phone: ''
    })

    const send = () => {
      if (validation()) {
        validateToken()
        const postData = {
          // userId: 1,
          ContactName: data.value.contact,
          CompanyName: data.value.company,
          Country: data.value.country.toString(),
          Email: data.value.mail,
          CellPhone: data.value.cellPhone.toString(),
          Phone: data.value.phone.toString()
        }
        apiToken.post('company', postData).then((response) => {
          console.log(response.data)
          catalogueCountry.value = response.data
          reset()
        }).catch((err) => {
          catchError(err)
        })
      }
    }

    const validation = () => {
      if (javascriptValidation.value) {
        refCompany.value.validate()
        refContact.value.validate()
        refMail.value.validate()
        refCellPhone.value.validate()
        refPhone.value.validate()
        data.value.country === '' || data.value.country === null ? refCountry.value = true : refCountry.value = false
      }

      if (!javascriptValidation.value) {
        return true
      }

      if (refCompany.value.hasError || refContact.value.hasError || refMail.value.hasError || refCellPhone.value.hasError || refPhone.value.hasError || data.value.country === '') {
        return false
      } else {
        return true
      }
    }

    const reset = () => {
      refCompany.value.resetValidation()
      refContact.value.resetValidation()
      refMail.value.resetValidation()
      refCellPhone.value.resetValidation()
      refPhone.value.resetValidation()
    }

    function simulateProgress () {
      loading.value = true

      setTimeout(() => {
        loading.value = false
      }, 3000)
    }

    const isValidEmail = (val) => {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      return emailPattern.test(val) || 'Invalid email'
    }

    const javascriptValidation = computed({
      get: () => {
        return $store.state.jwt.javascriptValidation
      }
    })

    const mounted = () => {
      validateToken()
      apiToken.get('cataloguePerfil').then((response) => {
        console.log(response.data)
        catalogueCountry.value = response.data
      }).catch((err) => {
        catchError(err)
      })
    }
    onMounted(mounted)

    return {
      data,
      refCompany,
      refContact,
      refCountry,
      refMail,
      refCellPhone,
      refPhone,
      loading,
      catalogueCountry,
      simulateProgress,
      validation,
      isValidEmail,
      send
    }
  }
}
</script>

<style lang="css" scoped>
.label {
  font-size: 17px;
}

.rcorners {
  border-radius: 45px;
  background: #73AD21;
  padding: 8px;
}

@media only screen and (min-width: 40em) and (orientation: landscape) {
  .marginLeft {
    margin-left: 49px;
  }
}

</style>
