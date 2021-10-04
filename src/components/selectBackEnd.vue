<template lang="">
  <div>
    <q-select dense filled v-model="backEnd" :options="optionsBackEnd" style="color:white;" label="Back End" multiple emit-value map-options optio-value="id" option-label="backEnd" color="red-10" bg-color="blue-grey-5" label-color="white">
      <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
        <q-item v-bind="itemProps"><q-item-section><q-item-label v-html="opt.backEnd" ></q-item-label></q-item-section>
          <q-item-section side><q-toggle :model-value="selected" @update:model-value="toggleOption(opt)" /></q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>
<script>

import { inject } from 'vue'

export default {
  setup () {
    const backEnd = inject('backEnd')
    const optionsBackEnd = inject('optionsBackEnd')

    return {
      backEnd,
      optionsBackEnd
    }
  }
}
</script>
