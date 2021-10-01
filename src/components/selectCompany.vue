<template lang="">
  <div>
    <q-select dense filled v-model="company" :options="companyOptions" emit-value map-options option-value="ID" option-label="companyName" label="Company" color="red-10" bg-color="blue-grey-5" label-color="white"/>
  </div>
</template>
<script>

import { ref, computed, watch } from 'vue'

export default {
  props: {
    propCompany: Array
  },
  setup (props, context) {
    const company = ref('')

    watch(company, (newVal) => {
      context.emit('callCompany', { newVal })
    })

    const companyOptions = computed(() => {
      return props.propCompany
    })

    return {
      company,
      companyOptions
    }
  }
}
</script>
