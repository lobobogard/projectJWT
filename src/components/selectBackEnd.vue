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

import { ref, computed, watch } from 'vue'

export default {
  props: {
    propBackEnd: Array
  },
  setup (props, context) {
    const backEnd = ref([])

    watch(backEnd, (newVal) => {
      context.emit('callBackEnd', { newVal })
    })

    const optionsBackEnd = computed(() => {
      return props.propBackEnd
    })

    return {
      backEnd,
      optionsBackEnd
    }
  }
}
</script>
