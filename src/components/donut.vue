<template lang="">
<div class="" style="height: 430px;">
    <apexchart id="chart" width="520" type="donut" :options="options.chartoptions" :series="serie"></apexchart>
</div>
</template>
<script>

import { inject } from 'vue'

export default {
  name: 'ApexColumn',
  setup () {
    const options = inject('options')
    const serie = inject('series')

    return {
      serie,
      options
    }
  }
}
</script>
<style lang="css" scoped>

</style>
