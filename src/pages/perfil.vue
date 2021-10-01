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
        <selectCompany :propCompany="optionCompany" @callCompany="callCompany"/>
        <!-- <q-select dense filled v-model="company" :options="optionCompany" emit-value map-options option-value="ID" option-label="companyName" label="Company" color="red-10" bg-color="blue-grey-5" label-color="pink-10"/> -->
        <!-- <div class="text-red-10" style="font-size:90%;" v-if="refCompany"><label>Field is required</label></div> -->
      </div>
      <div class="col-11 col-sm q-mt-md marginLeft">
         <selectSOperative :propSystemOperative="optionSystemOperative" @callSystemOperative="callSystemOperative" />
      </div>
      <div class="col-11 col-sm q-mt-md q-mr-md marginLeft">
        <selectServer :propServers="optionServers" @callServer="callServer" />
      </div>
    </div>
    <div class="row q-ml-md q-mt-md">
      <div class="col-11 col-sm q-mt-md text-left shadow-3 bg-blue-grey-9 text-white">
      <q-checkbox v-model="mySql" label="MySql" color="teal" />
      <q-checkbox v-model="mariaDB" label="MariaDB" color="pink" />
      <q-checkbox v-model="postgresSql" label="PostgresSql" color="orange" />
      <q-checkbox v-model="mongoDB" label="MongoDB" color="red" />
      <q-checkbox v-model="redis" label="Redis" color="cyan" />
      <q-checkbox v-model="sqlite" label="SQLite" color="green" />
      </div>
      <div class="col-11 col-sm q-mt-md marginLeft">
        <selectBackEnd :propBackEnd="optionsBackEnd" @callBackEnd="callBackEnd"/>
      </div>
      <div class="col-11 col-sm q-mt-md q-mr-md marginLeft">
        <selectFrontEnd :propFrontEnd="optionsFrontEnd" @callFrontEnd="callFrontEnd"/>
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
        <q-btn color="white" text-color="dark" label="CLEAN" style="width: 130px" />
      </div>
    </div>
  </div>
</q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import token from '../javascript/token'
import { api } from 'boot/axios'
import catchs from '../javascript/catch'
import selectCompany from 'components/selectCompany'
import selectServer from 'components/selectServer'
import selectBackEnd from 'components/selectBackEnd'
import selectFrontEnd from 'components/selectFrontEnd'
import selectSOperative from 'components/selectSOperative'
// import { Notificacion } from '../javascript/notification.js'

export default {
  name: 'perfil',
  components: { selectCompany, selectBackEnd, selectFrontEnd, selectSOperative, selectServer },
  setup () {
    const { catchError } = catchs()
    const { validateToken } = token()
    // models
    const company = ref(null)
    const server = ref(null)
    const sysOperative = ref(null)
    const backEnd = ref([])
    const frontEnd = ref([])
    const mySql = ref(true)
    const mariaDB = ref(false)
    const postgresSql = ref(false)
    const mongoDB = ref(true)
    const redis = ref(true)
    const sqlite = ref(true)
    // catalag
    const optionSystemOperative = ref()
    const optionServers = ref([])
    const optionsBackEnd = ref([])
    const optionsFrontEnd = ref([])
    const optionCompany = ref([])
    // comperative
    const compareSystemOperative = ref([])
    const compareServer = ref([])
    // data
    const loading = ref(false)

    // methods
    function callCompany (value) {
      company.value = value.newVal
    }

    function callSystemOperative (value) {
      sysOperative.value = value.newVal
    }

    function callServer (value) {
      server.value = value.newVal
    }

    function callBackEnd (value) {
      backEnd.value = value.newVal
    }

    function callFrontEnd (value) {
      frontEnd.value = value.newVal
    }

    const send = () => {
      validateToken().then(token => {
        const postData = {
          companyID: company.value,
          systemOperativeID: getSysOperativeID(),
          server: getServerID(),
          mysql: mySql.value,
          mariadb: mariaDB.value,
          postgresql: postgresSql.value,
          mongodb: mongoDB.value,
          redis: redis.value,
          sqlite: sqlite.value
        }
        console.log(postData)
        api.post('perfil', postData, { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
          console.log(response.data)
          // reset()
          // Notificacion(response.data, 'teal-10')
        }).catch((err) => {
          // catchError(err)
          console.log(err)
        })
      })
    }

    const getSysOperativeID = () => {
      let sysOperativeID = null
      compareSystemOperative.value.forEach((obj) => {
        if (obj.systemOperative === sysOperative.value) {
          sysOperativeID = obj.ID
        }
      })

      return sysOperativeID
    }

    const getServerID = () => {
      const value = []
      server.value.forEach((server, index) => {
        value[index] = compareServerName(server)
      })
      return value
    }

    const compareServerName = (server) => {
      let serverID = null
      compareServer.value.forEach((obj) => {
        console.log(server)
        if (obj.server === server) {
          serverID = obj.ID
        }
      })

      return serverID
    }

    const validation = () => {

    }

    function simulateProgress () {
      loading.value = true

      setTimeout(() => {
        loading.value = false
      }, 3000)
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
      // emmit value
      callCompany,
      callServer,
      callBackEnd,
      callFrontEnd,
      callSystemOperative,
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
      // data
      loading,
      simulateProgress,
      validation,
      send
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
