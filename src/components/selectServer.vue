<template lang="">
  <div>
      <q-select dense filled v-model="server" multiple :options="optionServers" label="Server Deploy" color="red-10" bg-color="blue-grey-5" label-color="white"/>
  </div>
</template>
<script>

import { ref, computed, watch } from 'vue'

export default {
  props: {
    propServers: Array
  },
  setup (props, context) {
    const server = ref(null)

    watch(server, (newVal) => {
      context.emit('callServer', { newVal })
    })

    const optionServers = computed(() => {
      return props.propServers
    })

    return {
      server,
      optionServers
    }
  }
}
</script>
