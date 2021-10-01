<template lang="">
  <div>
      <q-select dense filled v-model="systemOperative" use-input input-debounce="0" label="System Operative" :options="options" @filter="filterFn" behavior="dialog" color="red-10" bg-color="blue-grey-5" label-color="white">
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>
  </div>
</template>
<script>

import { ref, watch, computed } from 'vue'

export default {
  props: {
    propSystemOperative: Array
  },
  setup (props, context) {
    const options = ref(props.propSystemOperative)
    const systemOperative = ref(null)

    watch(systemOperative, (newVal) => {
      context.emit('callSystemOperative', { newVal })
    })

    const optionSystemOperative = computed(() => {
      return props.propSystemOperative
    })

    return {
      systemOperative,
      optionSystemOperative,
      options,

      filterFn (val, update) {
        if (val === '') {
          update(() => {
            options.value = optionSystemOperative.value
          })
          return
        }

        update(() => {
          const needle = val.toLowerCase()
          options.value = optionSystemOperative.value.filter(v => v.toLowerCase().indexOf(needle) > -1)
        })
      }
    }
  }
}
</script>
