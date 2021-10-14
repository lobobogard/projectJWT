<template>
<q-page>
  <div>
    <div class="row justify-center">
      <div class="q-mt-xl col-3 text-white bg-orange-10 text-center rcorners">
          <label class="label">VALIDATION</label>
      </div>
    </div>

    <div class="row bg-pink-10 q-mx-md q-mt-xl rcorners">
      <div class="col-2 text-center q-mt-xs">
         <q-toggle v-model="javascriptValidation" checked-icon="verified_user" unchecked-icon="remove_moderator" color="red" size="lg" >
           <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
            <strong> {{javascriptValidation ? "Front end " : "Back end"}}</strong>
          </q-tooltip>
         </q-toggle>
      </div>
      <div class="col text-white q-mt-sm">
         It is very important to carry out validation tests for testing purposes we can disable or enabled validations and test the <b>{{javascriptValidation ? "Front end " : "Back end"}}</b> validations by using javascript or golang.
      </div>
    </div>

  </div>
</q-page>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const $store = useStore()

    const javascriptValidation = computed({
      get: () => {
        return $store.state.jwt.javascriptValidation
      },
      set: val => {
        $store.commit('jwt/setJavascriptValidation', val)
      }
    })

    return {
      javascriptValidation
    }
  }
}
</script>
<style lang="css" scoped>
.rcorners {
  border-radius: 45px;
  background: #73AD21;
  padding: 8px;
}
</style>
