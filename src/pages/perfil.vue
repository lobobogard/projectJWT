<template lang="html">
<q-page class="bg-grey-2">
<div>
  <div class="row justify-center">
      <div class="q-mt-sm col-3 text-center">
        <q-icon name="school" class="text-red-10" style="font-size: 3rem;" />
      </div>
    </div>
  <div class="row q-pt-md">
    <div class="col-11 col-sm q-mt-md marginLeft text-center">
       <q-btn class="bg-grey-7 text-white" icon="add" label="perfil" style="width: 200px" :to="{name:'perfilCreate'}"/>
    </div>
    <div class="col-11 col-sm q-mt-md marginLeft">
      <q-select dense filled clearable v-model="company" :options="optionCompany" color="dark" emit-value map-options option-value="ID" option-label="companyName" label="Company"/>
    </div>
    <div class="col-11 col-sm q-mt-md q-mr-md marginLeft">
      <q-select dense filled clearable v-model="sysOperative" :options="optionSystemOperative" color="dark" emit-value map-options option-value="ID" option-label="systemOperative" label="System Operative"/>
    </div>
    <div class="col-11 col-sm q-mt-md q-mr-md marginLeft">
       <q-select dense filled v-model="backEnd" :options="optionsBackEnd" style="color:white;" label="Back End" multiple emit-value map-options optio-value="id" option-label="backEnd" color="red-10">
      <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
        <q-item v-bind="itemProps"><q-item-section><q-item-label v-html="opt.backEnd" ></q-item-label></q-item-section>
          <q-item-section side><q-toggle :model-value="selected" @update:model-value="toggleOption(opt)" /></q-item-section>
        </q-item>
      </template>
    </q-select>
    </div>
  </div>
  <div class="row q-mt-xl">
    <div class="col text-right q-pr-xl pointer">
      <q-btn :loading="loading" class="bg-red-10 text-white" label="" style="width: 150px" @click="findPerfil">
          Find
          <template v-slot:loading>
           <q-spinner-hourglass class="on-left" />
           Saving...
           </template>
        </q-btn>
    </div>
    <div class="col text-left q-pl-xl">
      <q-btn class="bg-red-10 text-white" label="clean" style="width: 150px" @click="clean()"/>
    </div>
  </div>
  <div class="row">
    <div class="col q-mt-xl">
        <div class="table-wrapper">
            <table class="fl-table">
                <thead>
                <tr>
                    <th>Company</th>
                    <th>System Operative</th>
                    <th>Back End</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in items" :key="index">
                    <td>{{item.Company_name}}</td>
                    <td>{{item.System_operative}}</td>
                    <td>{{item.Backend}}</td>
                    <td><q-btn round color="grey-5" glossy text-color="white" icon="edit" size="10px" :to="{name: 'companyUpdate', params: { companyID: item.ID }}" /></td>
                    <td><q-btn round color="red-10" glossy text-color="white" icon="delete" size="10px" @click="confirmDeletePerfil(item.ID)"/></td>
                  </tr>
                  <tr class="text-center" v-if="items.length == 0">
                    <td class="bg-grey-8 text-white" colspan="8"><q-icon name="disabled_visible" class="text-white" style="font-size: 3em;" /></td>
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
          <span class="q-ml-sm">Are you sure to delete this profile?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="YES" color="red-10" v-close-popup @click ="deletePerfil()"/>
          <q-btn flat label="NO" color="grey-5" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</div>
</q-page>
</template>
<script>
import { ref, onMounted } from 'vue'
import token from '../javascript/token'
import { api } from 'boot/axios'
import catchs from '../javascript/catch'
import arrays from '../javascript/arrays'
import { Notificacion } from '../javascript/notification'

export default {
  name: 'perfil',
  setup () {
    const { catchError } = catchs()
    const { validateToken } = token()
    const { getComapareID } = arrays()
    // models
    const confirm = ref(false)
    const company = ref(null)
    const sysOperative = ref(null)
    const backEnd = ref([])
    const perfilID = ref(null)
    // catalag
    const optionCompany = ref([])
    const optionSystemOperative = ref()
    const optionsBackEnd = ref([])
    // data
    const items = ref([])
    const loading = ref(false)

    const findPerfil = () => {
      loading.value = true
      validateToken().then(token => {
        const backEnds = getComapareID(backEnd.value, optionsBackEnd.value)
        api.get('perfilFind?companyID=' + company.value + '&sysOperativeID=' + sysOperative.value + '&backEnd=' + backEnds, { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
          console.log(response.data)
          response.data === null ? items.value = [] : items.value = response.data
          console.log(items.value)
          loading.value = false
        }).catch((err) => {
          loading.value = false
          catchError(err)
        })
      })
    }

    function confirmDeletePerfil (idPerfil) {
      perfilID.value = idPerfil
      confirm.value = true
    }

    function deletePerfil () {
      validateToken().then(token => {
        api.delete('perfil/' + perfilID.value, { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
          Notificacion(response.data, 'teal-10')
          findPerfil()
        }).catch((err) => {
          catchError(err)
        })
      })
    }

    function clean () {
      company.value = null
      sysOperative.value = null
      backEnd.value = []
    }

    const mounted = () => {
      validateToken().then(token => {
        api.get('perfil', { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
          console.log(response.data.BackEnd)
          optionCompany.value = response.data.Company
          optionSystemOperative.value = response.data.CatSystemOperative
          optionsBackEnd.value = response.data.CatBackEnd
        }).catch((err) => {
          console.log(err)
          catchError(err)
        })
      })
    }

    onMounted(mounted)

    return {
      items,
      loading,
      // model
      confirm,
      company,
      sysOperative,
      backEnd,
      perfilID,
      // catalogue
      optionCompany,
      optionSystemOperative,
      optionsBackEnd,
      // function
      findPerfil,
      confirmDeletePerfil,
      deletePerfil,
      clean
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
