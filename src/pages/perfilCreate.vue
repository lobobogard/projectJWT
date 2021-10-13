<template lang="">
<q-page class="bg-grey-2">
  <div>
    <div class="row justify-center">
      <div class="q-mt-xl col-3 text-white bg-red-10 text-center rcorners">
          <label class="label">PERFIL</label>
      </div>
    </div>
    <div class="row q-ml-md q-mt-md">
      <div class="col-11 col-sm q-mt-md q-mr-md">
        <selectCompany />
         <q-slide-transition><div class="text-red-10" style="font-size:90%;" v-if="refCompany"><label>Field is required</label></div></q-slide-transition>
      </div>
      <div class="col-11 col-sm q-mt-md marginLeft">
         <selectSOperative />
          <q-slide-transition><div class="text-red-10" style="font-size:90%;" v-if="refSOperative"><label>Field is required</label></div></q-slide-transition>
      </div>
      <div class="col-11 col-sm q-mt-md q-mr-md marginLeft">
        <selectServer />
         <q-slide-transition><div class="text-red-10" style="font-size:90%;" v-if="refServer"><label>Field is required</label></div></q-slide-transition>
      </div>
    </div>
    <div class="row q-ml-md q-mt-md">
      <div class="col-11 col-sm q-mt-md text-left">
      <div class="shadow-3 bg-blue-grey-9 text-white">
        <q-checkbox v-model="mySql" label="MySql" color="teal" />
        <q-checkbox v-model="mariaDB" label="MariaDB" color="pink" />
        <q-checkbox v-model="postgresSql" label="PostgresSql" color="orange" />
        <q-checkbox v-model="mongoDB" label="MongoDB" color="red" />
        <q-checkbox v-model="redis" label="Redis" color="cyan" />
        <q-checkbox v-model="sqlite" label="SQLite" color="green" />
      </div>
      <div>
         <q-slide-transition><div class="text-red-10" style="font-size:90%;" v-if="refDataBase"><label>Field is required</label></div></q-slide-transition>
      </div>
      </div>
      <div class="col-11 col-sm q-mt-md marginLeft">
        <selectBackEnd />
         <q-slide-transition><div class="text-red-10" style="font-size:90%;" v-if="refBackEnd"><label>Field is required</label></div></q-slide-transition>
      </div>
      <div class="col-11 col-sm q-mt-md q-mr-md marginLeft">
        <selectFrontEnd />
         <q-slide-transition><div class="text-red-10" style="font-size:90%;" v-if="refFrontEnd"><label>Field is required</label></div></q-slide-transition>
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
        <q-btn color="white" text-color="dark" label="CLEAN" style="width: 130px" @click="clean"/>
      </div>
    </div>
  </div>
</q-page>
</template>

<script>
import { ref, onMounted, computed, provide } from 'vue'
import token from '../javascript/token'
import { api } from 'boot/axios'
import catchs from '../javascript/catch'
import arrays from '../javascript/arrays'
import selectCompany from 'components/selectCompany'
import selectServer from 'components/selectServer'
import selectBackEnd from 'components/selectBackEnd'
import selectFrontEnd from 'components/selectFrontEnd'
import selectSOperative from 'components/selectSOperative'
import { Notificacion } from '../javascript/notification.js'
import { useStore } from 'vuex'

export default {
  name: 'perfilCreate',
  components: { selectCompany, selectBackEnd, selectFrontEnd, selectSOperative, selectServer },
  setup () {
    const { catchError } = catchs()
    const { getComapareID } = arrays()
    const { validateToken } = token()
    const $store = useStore()
    // models
    const company = ref(null)
    const sysOperative = ref(null)
    const server = ref([])
    const backEnd = ref([])
    const frontEnd = ref([])
    const mySql = ref(false)
    const mariaDB = ref(false)
    const postgresSql = ref(false)
    const mongoDB = ref(false)
    const redis = ref(false)
    const sqlite = ref(false)
    // catalag
    const optionSystemOperative = ref()
    const optionServers = ref([])
    const optionsBackEnd = ref([])
    const optionsFrontEnd = ref([])
    const optionCompany = ref([])
    // comperative
    const compareSystemOperative = ref([])
    const compareServer = ref([])
    // validate
    const refCompany = ref(false)
    const refSOperative = ref(false)
    const refServer = ref(false)
    const refDataBase = ref(false)
    const refBackEnd = ref(false)
    const refFrontEnd = ref(false)
    // data
    const loading = ref(false)
    // provider model
    provide('sysOperative', sysOperative)
    provide('company', company)
    provide('server', server)
    provide('backEnd', backEnd)
    provide('frontEnd', frontEnd)

    // provider catalag
    provide('optionCompany', optionCompany)
    provide('optionSystemOperative', optionSystemOperative)
    provide('optionServers', optionServers)
    provide('optionsBackEnd', optionsBackEnd)
    provide('optionsFrontEnd', optionsFrontEnd)

    // config validation
    const javascriptValidation = computed({
      get: () => {
        return $store.state.jwt.javascriptValidation
      }
    })

    const send = () => {
      if (validation()) {
        createPerfil()
      }
    }

    const createPerfil = () => {
      validateToken().then(token => {
        const postData = {
          companyID: company.value,
          systemOperativeID: getSysOperativeID(),
          server: getServerID(),
          backEnd: getComapareID(backEnd.value, optionsBackEnd.value),
          frontEnd: getComapareID(frontEnd.value, optionsFrontEnd.value),
          mysql: mySql.value,
          mariadb: mariaDB.value,
          postgresql: postgresSql.value,
          mongodb: mongoDB.value,
          redis: redis.value,
          sqlite: sqlite.value
        }
        api.post('perfil', postData, { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
          clean()
          Notificacion(response.data, 'teal-10')
        }).catch((err) => {
          catchError(err)
          console.log(err)
        })
      })
    }

    const clean = () => {
      company.value = null
      server.value = []
      sysOperative.value = null
      backEnd.value = []
      frontEnd.value = []
      mySql.value = false
      mariaDB.value = false
      postgresSql.value = false
      mongoDB.value = false
      redis.value = false
      sqlite.value = false
    }

    const validation = () => {
      let result = true
      refCompany.value = false
      refSOperative.value = false
      refServer.value = false
      refDataBase.value = false
      refBackEnd.value = false
      refFrontEnd.value = false

      if (!javascriptValidation.value) {
        return result
      }

      if (!company.value) {
        refCompany.value = true
        result = false
      }

      if (!sysOperative.value) {
        refSOperative.value = true
        result = false
      }

      if (server.value.length === 0) {
        refServer.value = true
        result = false
      }

      if (backEnd.value.length === 0) {
        refBackEnd.value = true
        result = false
      }

      if (frontEnd.value.length === 0) {
        refFrontEnd.value = true
        result = false
      }

      if (!mySql.value && !mariaDB.value && !postgresSql.value && !mongoDB.value && !redis.value && !sqlite.value) {
        refDataBase.value = true
        result = false
      }

      return result
    }

    const getSysOperativeID = () => {
      let sysOperativeID = null
      compareSystemOperative.value.forEach((obj) => { if (obj.systemOperative === sysOperative.value) { sysOperativeID = obj.ID } })
      return sysOperativeID
    }

    const getServerID = () => {
      const value = []
      server.value.forEach((server, index) => { value[index] = compareServerName(server) })
      return value
    }

    const compareServerName = (server) => {
      let serverID = null
      compareServer.value.forEach((obj) => { if (obj.server === server) { serverID = obj.ID } })
      return serverID
    }

    const mounted = () => {
      validateToken().then((token) => {
        api.get('catalogueCompany', { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
          optionCompany.value = response.data.Company
          optionSystemOperative.value = response.data.CatSystemOperative.map((obj, i) => { return obj.systemOperative })
          compareSystemOperative.value = response.data.CatSystemOperative
          optionServers.value = response.data.CatServer.map((obj, i) => { return obj.server })
          compareServer.value = response.data.CatServer
          optionsBackEnd.value = response.data.BackEnd
          optionsFrontEnd.value = response.data.FrontEnd
          console.log(response.data)
        }).catch((err) => {
          catchError(err)
          console.log(err)
        })
      })
    }

    onMounted(mounted)

    return {
      // catalag
      optionCompany,
      optionServers,
      optionsBackEnd,
      optionsFrontEnd,
      optionSystemOperative,
      // compare
      compareSystemOperative,
      compareServer,
      // models
      company,
      sysOperative,
      server,
      backEnd,
      frontEnd,
      mySql,
      mariaDB,
      postgresSql,
      mongoDB,
      redis,
      sqlite,
      // validate
      refCompany,
      refSOperative,
      refServer,
      refDataBase,
      refBackEnd,
      refFrontEnd,
      // data
      loading,
      send,
      clean
    }
  }
}
</script>
<style>
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
