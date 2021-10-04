<template lang="">
  <div>
    <q-select dense filled v-model="company" :options="optionCompany" emit-value map-options option-value="ID" option-label="companyName" label="Company" color="red-10" bg-color="blue-grey-5" label-color="white"/>
  </div>
</template>
<script>

import { inject } from 'vue'

export default {
  setup () {
    const company = inject('company')
    const optionCompany = inject('optionCompany')

    return {
      company,
      optionCompany
    }
  }
}
</script>
