<template>
    <!-- <q-form action="https://some-url.com" method="post"> -->
       <div class="row q-mt-md justify-center" style="height: 0px">
         <div class="col-8 col-sm-3">
          <div class="row shadow-2 redondo bg-pink-10">
            <div class="col">
               <div class="row text-center">
                 <div class="col q-mt-md">
                    <label class="text-white font">Jason Web Token</label>
                 </div>
              </div>
              <div class="row text-center">
                 <div class="col">
                    <q-img src="~assets/golang/project.png" spinner-color="white" fit="fill" style="height: 120px; max-width: 120px" class="img-exp q-mt-sm" />
                 </div>
              </div>
              <div class="row justify-center q-mt-xl">
                 <div class="col-9">
                     <q-input rounded outlined dense v-model="nombre" label="Name" label-color="white" bg-color="pink-8" autocomplete="off">
                      <template v-slot:append>
                        <q-icon name="account_circle" color="white"/>
                      </template>
                    </q-input>
                 </div>
              </div>
               <div class="row justify-center">
                 <q-slide-transition>
                 <div class="col-9 q-ml-md" v-show="validaNombre">
                    <label class="font_advertencia">{{validaNombre}} </label><q-icon class="q-pl-sm" name="info" style="color: white; font-size: 1em;" />
                 </div>
                 </q-slide-transition>
              </div>
              <div class="row justify-center q-mt-md">
                 <div class="col-9">
                     <q-input rounded outlined dense v-model="contrasena" :type="visibilidad" label="password" class="text-color-white" label-color="white" bg-color="pink-8" >
                      <template v-slot:append>
                        <q-icon name="visibility" color="white" @click="visibilidadPassword" class="pointer"/>
                      </template>
                    </q-input>
                 </div>
              </div>
              <div class="row justify-center q-mt-md">
                 <q-slide-transition>
                 <div class="col-9 q-ml-md" v-show="validaContrasena">
                    <label class="font_advertencia"> {{validaContrasena}} </label><q-icon class="q-pl-sm" name="info" style="color: white; font-size: 1em;" />
                 </div>
                 </q-slide-transition>
              </div>
              <div class="row justify-center q-mt-xl text-center">
                 <div class="col-9">
                      <label class="font_register pointer" @click="opcionLoginRegister = !opcionLoginRegister" style="text-decoration:underline">REGISTER</label>
                 </div>
              </div>
              <div class="row justify-center q-mt-md text-center q-mt-xl" style="height: 100px">
                 <div class="col-9">
                     <q-btn rounded color="pink-12" class="full-width" text-color="white" label="Login" @click="login">
                       <div v-show="spinnerGenerar"><q-spinner-pie class="q-ml-sm" color="pink-1" /></div>
                      </q-btn>
                 </div>
              </div>
            </div>
          </div>
          </div>
       </div>
    <!-- </q-form> -->
</template>

<script lang="">
import { api } from 'boot/axios'
import { defineComponent, computed, ref } from 'vue'
import { Notificacion } from '../javascript/notification.js'
import { SessionStorage, useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import logoutApi from '../javascript/logoutApi'
import { useStore } from 'vuex'

export default defineComponent({
  setup () {
    const router = useRouter()
    const $store = useStore()
    const $q = useQuasar()
    const { sessionToken } = logoutApi()
    const data = ref(null)
    const nombre = ref('')
    const contrasena = ref('')
    const validaNombre = ref('')
    const validaContrasena = ref('')
    const spinnerGenerar = ref(false)
    const visibilidad = ref('password')

    const login = () => {
      spinnerGenerar.value = true
      if (validarCuenta()) {
        guardarCuenta()
      } else {
        spinnerGenerar.value = false
      }
    }

    const guardarCuenta = () => {
      const data = { name: nombre.value, pass: contrasena.value }
      api.post('login', data, { withCredentials: true }).then((response) => {
        saveTokens(response.data.token)
        Notificacion('Successfully Generated Token', 'cyan-10')
        router.push({ name: 'information' })
      }).catch(error => {
        console.log(error)
        spinnerGenerar.value = false
        if (error.response.status === 401) {
          Notificacion(error.response.data, 'red-10')
        } else {
          Notificacion('Server error communicating with support', 'red-10')
        }
      })
    }

    const validarCuenta = () => {
      let validacion = true

      if (nombre.value === '') {
        validacion = false
        validaNombre.value = 'Name is required'
      } else if (nombre.value.length > 12) {
        validacion = false
        validaNombre.value = 'Name should not exceed 12 characters'
      } else {
        validaNombre.value = ''
      }

      if (contrasena.value === '') {
        validacion = false
        validaContrasena.value = 'Password is required'
      } else if (contrasena.value.length > 8) {
        validacion = false
        validaContrasena.value = 'Password should not exceed 8 characters'
      } else {
        validaContrasena.value = ''
      }
      return validacion
    }

    const visibilidadPassword = () => {
      visibilidad.value = 'text'
      setTimeout(() => { visibilidad.value = 'password' }, 2000)
    }

    const saveTokens = (token) => {
      SessionStorage.set('token', token)
      sessionToken.value = SessionStorage.getItem('token')
    }

    const opcionLoginRegister = computed({
      get: () => {
        return $store.state.jwt.opcionLoginRegister
      },
      set: val => {
        $store.commit('jwt/setOpcionLoginRegister', val)
      }
    })

    const notificacion = (mensaje) => {
      $q.notify({
        message: mensaje,
        color: 'purple'
      })
    }

    return {
      opcionLoginRegister,
      data,
      nombre,
      contrasena,
      validaNombre,
      validaContrasena,
      cyan: ref(true),
      spinnerGenerar,
      sessionToken,
      visibilidad,
      validarCuenta,
      guardarCuenta,
      login,
      visibilidadPassword,
      notificacion
    }
  }
})
</script>

<style scoped>
.redondo {
  border-radius: 15px;
}

.font {
  font-family: serif;
  font-size:200%
}

.font_checkbox {
  font-family: serif;
  font-size:70%;
  color: white;
}

.font_register {
  font-family: serif;
  font-size:90%;
  color: white;
}

.font_advertencia {
  font-family: serif;
  font-size:70%;
  color: white;
}

.pointer {
  cursor: pointer
}
</style>
