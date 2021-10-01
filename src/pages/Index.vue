<template>
  <q-page>
    <div class="">
    <register v-if="opcionLoginRegister" />
    <login  v-if="!opcionLoginRegister" />
    </div>
  </q-page>
</template>

<script lang="">
import { defineComponent, computed, onMounted } from 'vue'
import logoutApi from '../javascript/logoutApi'
import login from 'components/login'
import register from 'components/register'
import { useStore } from 'vuex'

export default defineComponent({
  components: { login, register },
  setup () {
    const { logout } = logoutApi()
    const $store = useStore()

    const opcionLoginRegister = computed({
      get: () => {
        return $store.state.jwt.opcionLoginRegister
      },
      set: val => {
        $store.commit('jwt/setOpcionLoginRegister', val)
      }
    })

    onMounted(logout)
    return {
      opcionLoginRegister
    }
  }
})
</script>

<style scoped>

</style>
