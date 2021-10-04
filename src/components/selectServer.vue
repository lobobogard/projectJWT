<template lang="">
  <div>
      <q-select dense filled v-model="server" multiple :options="optionServers" label="Server Deploy" color="red-10" bg-color="blue-grey-5" label-color="white"/>
  </div>
</template>
<script>

import { inject } from 'vue'

export default {
  setup () {
    const server = inject('server')
    const optionServers = inject('optionServers')

    return {
      server,
      optionServers
    }
  }
}
</script>
