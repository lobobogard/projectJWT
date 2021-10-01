<template lang="">
  <div>
    <q-select dense filled v-model="frontEnd" :options="optionsFrontEnd" style="color:white;" label="Back End" multiple emit-value map-options optio-value="id" option-label="frontEnd" color="red-10" bg-color="blue-grey-5" label-color="white">
      <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
        <q-item v-bind="itemProps"><q-item-section><q-item-label v-html="opt.frontEnd" ></q-item-label></q-item-section>
          <q-item-section side><q-toggle :model-value="selected" @update:model-value="toggleOption(opt)" /></q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>
<script>

import { ref, computed, watch } from 'vue'

export default {
  props: {
    propFrontEnd: Array
  },
  setup (props, context) {
    const frontEnd = ref([])

    watch(frontEnd, (newVal) => {
      context.emit('callFrontEnd', { newVal })
    })

    const optionsFrontEnd = computed(() => {
      return props.propFrontEnd
    })

    return {
      frontEnd,
      optionsFrontEnd
    }
  }
}
</script>
