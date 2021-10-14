<template lang="">
  <div>
     <q-dialog v-model="modalEmail">
      <q-card style="width: 700px; max-width: 80vw;" :class="concurrencyFlag ? 'bg-green-3' : 'bg-red-3'">
        <q-card-section>
          <div class="text-h6 text-center label text-white"><b>DATA TIME SERVER {{ concurrencyFlag ? "WITH CONCURRENCY" : "WITHOUT CONCURRENCY"}}</b></div>
        </q-card-section>

        <q-card-section class="q-pt-none text-white">
          <div class="row text-center" v-for="(item, index) in dataEmail.DataEmail" :key="index">
            <div class="col">Name: {{item.Name}}</div>
            <div class="col">Email: {{item.Email}}</div>
            <div class="col">Time send: <b>{{item.FinishTime - item.StartTime}}</b><br></div>
          </div>

          <div class="row q-mt-md text-center">
            <div class="col">
              Total time sent <b>{{ dataEmail.FinishTime - dataEmail.StartTime}}</b> Seconds
            </div>
          </div>

        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { inject } from 'vue'
export default {
  setup () {
    const concurrencyFlag = inject('concurrencyFlag')
    const modalEmail = inject('modalEmail')
    const dataEmail = inject('dataEmail')
    return {
      concurrencyFlag,
      modalEmail,
      dataEmail
    }
  }
}
</script>

<style lang="css" scoped>
.label {
  font-size: 15px;
}

.rcorners {
  border-radius: 45px;
  background: hsl(23, 94%, 63%);
  padding: 2px;
}

</style>
