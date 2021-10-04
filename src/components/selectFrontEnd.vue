<template lang="">
  <div>
    <q-select dense filled v-model="frontEnd" :options="optionsFrontEnd" style="color:white;" label="Front End" multiple emit-value map-options optio-value="id" option-label="frontEnd" color="red-10" bg-color="blue-grey-5" label-color="white">
      <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
        <q-item v-bind="itemProps"><q-item-section><q-item-label v-html="opt.frontEnd" ></q-item-label></q-item-section>
          <q-item-section side><q-toggle :model-value="selected" @update:model-value="toggleOption(opt)" /></q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>
<script>

import { inject } from 'vue'

export default {
  props: {
    propFrontEnd: Array
  },
  setup () {
    const frontEnd = inject('frontEnd')
    const optionsFrontEnd = inject('optionsFrontEnd')

    return {
      frontEnd,
      optionsFrontEnd
    }
  }
}
</script>
