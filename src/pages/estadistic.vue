<template lang="">
<q-page class="bg-grey-2">
  <div>
  <div class="row justify-center shadow-3 bg-pink-10 q-pt-xl">
    <div class="col col-md-4">
       <donut />
      </div>
  </div>
  <div class="row q-mt-xl justify-center">
    <div class="col-4 q-mr-md">
    <q-select dense filled v-model="company" :options="optionsCompany" style="color:white;" label="Company" multiple emit-value map-options optio-value="id" option-label="companyName" color="red-10" bg-color="blue-grey-5" label-color="white">
      <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
        <q-item v-bind="itemProps"><q-item-section><q-item-label v-html="opt.companyName" ></q-item-label></q-item-section>
          <q-item-section side><q-toggle :model-value="selected" @update:model-value="toggleOption(opt)" /></q-item-section>
        </q-item>
      </template>
    </q-select>
    </div>
    <div class="col-4">
    <q-select dense filled v-model="backEnd" :options="optionsBackEnd" style="color:white;" label="Back End" multiple emit-value map-options optio-value="id" option-label="backEnd" color="red-10" bg-color="blue-grey-5" label-color="white">
      <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
        <q-item v-bind="itemProps"><q-item-section><q-item-label v-html="opt.backEnd" ></q-item-label></q-item-section>
          <q-item-section side><q-toggle :model-value="selected" @update:model-value="toggleOption(opt)" /></q-item-section>
        </q-item>
      </template>
    </q-select>
    </div>
  </div>
  <div class="row q-mt-xl">
    <div class="col text-center">
      <q-btn color="primary" icon="manage_search" label="" style="width: 200px" @click="bringEstadistic" />
    </div>
  </div>
  </div>
</q-page>
</template>
<script>

import { ref, onMounted, provide } from 'vue'
import donut from 'components/donut'
import { api } from 'boot/axios'
import token from '../javascript/token'
import catchs from '../javascript/catch'
import arrays from '../javascript/arrays'
export default {
  name: 'ApexColumn',
  components: { donut },
  setup () {
    const { validateToken } = token()
    const { catchError } = catchs()
    const { getComapareID } = arrays()

    const company = ref(null)
    const optionsCompany = ref([])
    const backEnd = ref(null)
    const optionsBackEnd = ref([])
    const options = ref({
      chartoptions: {
        labels: [],
        legend: {
          labels: {
            colors: '#FFF'
          }
        }
      }
    })
    const series = ref([])
    // provider
    provide('series', series)
    provide('options', options)

    const bringEstadistic = () => {
      validateToken().then(token => {
        const getCompany = company.value !== null ? getComapareID(company.value, optionsCompany.value) : ''
        const getBackEnd = backEnd.value !== null ? getComapareID(backEnd.value, optionsBackEnd.value) : ''
        const datalabel = []
        const dataseries = []
        api.get('estadistic?backEnd=' + getBackEnd + '&company=' + getCompany, { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
          if (response.data !== null) {
            response.data.forEach(function (element) {
              datalabel.push(element.Back_end)
              dataseries.push(element.ReportBackEnd)
            })
            assignDataEstadistic(datalabel, dataseries)
          }
        }).catch((err) => {
          catchError(err)
          console.log(err)
        })
      })
    }

    function assignDataEstadistic (datalabel, dataseries) {
      series.value = dataseries
      options.value = {
        chartoptions: {
          labels: datalabel,
          legend: {
            labels: {
              colors: '#FFF'
            }
          }
        }
      }
    }

    onMounted(() => {
      validateToken().then(token => {
        api.get('mountEstadistic', { headers: { Authorization: `Bearer ${token}` } }).then(response => {
          optionsCompany.value = response.data.Company
          optionsBackEnd.value = response.data.BackEnd
        }).catch(err => {
          catchError(err)
        })
      })
    })

    return {
      company,
      optionsCompany,
      backEnd,
      optionsBackEnd,
      series,
      options,
      // function
      bringEstadistic
    }
  }
}
</script>
<style lang="css" scoped>

</style>
