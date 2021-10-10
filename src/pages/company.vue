<template lang="html">
<q-page class="bg-grey-2">
<div>
  <div class="row justify-center">
      <div class="q-mt-sm col-3 text-center">
        <q-icon name="location_city" class="text-red-10" style="font-size: 3rem;" />
      </div>
    </div>
  <div class="row q-pt-md">
    <div class="col-11 col-sm q-mt-md marginLeft text-center">
       <q-btn class="bg-grey-7 text-white" icon="add" label="company" style="width: 200px" :to="{name:'companyCreate'}"/>
    </div>
    <div class="col-11 col-sm q-mt-md marginLeft">
        <q-input dense filled v-model="company" color="dark" label="Company name">
          <template v-slot:prepend>
            <q-icon name="location_city" color="red-10" />
          </template>
        </q-input>
    </div>
    <div class="col-11 col-sm q-mt-md q-mr-md marginLeft">
      <q-input dense filled v-model="contact" color="dark" label="Contact Name">
          <template v-slot:prepend>
            <q-icon name="person" color="red-10" />
          </template>
      </q-input>
    </div>
    <div class="col-11 col-sm q-mt-md q-mr-md marginLeft">
       <q-input dense filled v-model="email" color="dark" label="Email">
          <template v-slot:prepend>
            <q-icon name="mail" color="red-10" />
          </template>
       </q-input>
    </div>
  </div>
  <div class="row q-mt-xl">
    <div class="col text-right q-pr-xl pointer">
      <q-btn :loading="loading" class="bg-red-10 text-white" label="" style="width: 150px" @click="findCompany">
          Find
          <template v-slot:loading>
           <q-spinner-hourglass class="on-left" />
           Saving...
           </template>
        </q-btn>
    </div>
    <div class="col text-left q-pl-xl">
      <q-btn class="bg-red-10 text-white" label="clean" style="width: 150px"/>
    </div>
  </div>
  <div class="row">
    <div class="col q-mt-xl">
        <div class="table-wrapper">
            <table class="fl-table">
                <thead>
                <tr>
                    <th>Company</th>
                    <th>Contact</th>
                    <th>Country</th>
                    <th>Email</th>
                    <th>Cell</th>
                    <th>Phone</th>
                    <th>Update</th>
                    <th>Delete</th>
                    <!-- <th><q-icon name="edit" class="text-red-10" style="font-size: 1.5rem;" /></th> -->
                    <!-- <th><q-icon name="delete" class="text-grey-4" style="font-size: 1.5rem;" /></th> -->
                </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in items" :key="index">
                    <td>{{item.companyName}}</td>
                    <td>{{item.contactName}}</td>
                    <td>{{item.CatCountry.country}}</td>
                    <td>{{item.email}}</td>
                    <td>{{item.cellPhone}}</td>
                    <td>{{item.phone}}</td>
                    <td><q-btn round color="grey-5" glossy text-color="white" icon="edit" size="10px" :to="{name: 'companyUpdate', params: { companyID: item.ID }}" /></td>
                    <td><q-btn round color="red-10" glossy text-color="white" icon="delete" size="10px" @click="confirmDeleteCompany(item.ID)"/></td>
                  </tr>
                  <tr class="text-center" v-if="items.length == 0">
                    <td class="bg-grey-8 text-white" colspan="8"><q-icon name="domain_disabled" class="text-white" style="font-size: 3em;" /></td>
                  </tr>
                </tbody>
            </table>
        </div>
    </div>
  </div>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="rule" color="red-10" text-color="white" />
          <span class="q-ml-sm">Are you sure to delete this company?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="YES" color="red-10" v-close-popup @click ="deleteCompany()"/>
          <q-btn flat label="NO" color="grey-5" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</div>
</q-page>
</template>
<script>
import { ref } from 'vue'
import token from '../javascript/token'
import { api } from 'boot/axios'
import catchs from '../javascript/catch'
import { Notificacion } from '../javascript/notification.js'

export default {
  setup () {
    const { catchError } = catchs()
    const { validateToken } = token()
    // data
    const items = ref([])
    const loading = ref(false)
    // model
    const confirm = ref(false)
    const company = ref(null)
    const contact = ref(null)
    const email = ref(null)
    const companyID = ref(null)

    // function
    const findCompany = () => {
      loading.value = true
      validateToken().then(token => {
        api.get('company?company=' + company.value + '&contact=' + contact.value + '&email=' + email.value, { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
          console.log(response.data)
          items.value = response.data
          loading.value = false
        }).catch((err) => {
          loading.value = false
          catchError(err)
        })
      })
    }

    function confirmDeleteCompany (idCompany) {
      companyID.value = idCompany
      confirm.value = true
    }

    function deleteCompany () {
      validateToken().then(token => {
        api.delete('company/' + companyID.value, { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
          Notificacion(response.data, 'teal-10')
          findCompany()
        }).catch((err) => {
          catchError(err)
        })
      })
    }

    return {
      // data
      items,
      loading,
      // model
      confirm,
      company,
      contact,
      email,
      companyID,
      // function
      findCompany,
      deleteCompany,
      confirmDeleteCompany
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

@media only screen and (min-width: 20em) and (orientation: landscape) {
  .marginLeft {
    margin-left: 20px;
  }
}

@import '../css/table.css'
</style>
