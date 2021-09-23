<template>
  <q-page class="">
    <!-- <q-form action="https://some-url.com" method="post"> -->
       <div class="row q-mt-md justify-center" style="height: 0px">
         <div class="col-8 col-sm-3">
          <div class="row shadow-2 redondo bg-pink-10">
            <div class="col">
               <div class="row text-center">
                 <div class="col q-mt-md">
                    <label class="text-white font">Developer</label>
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
              <div class="row justify-center">
                 <q-slide-transition>
                 <div class="col-9 q-ml-md" v-show="validaContrasena">
                    <label class="font_advertencia"> {{validaContrasena}} </label><q-icon class="q-pl-sm" name="info" style="color: white; font-size: 1em;" />
                 </div>
                 </q-slide-transition>
              </div>
              <div class="row justify-center q-mt-md" v-if="opcion">
                 <div class="col-9">
                     <q-input rounded outlined dense v-model="confirmContrasena" :type="visibilidadConfirm" label="confirm password" class="text-color-white" label-color="white" bg-color="pink-8" >
                      <template v-slot:append>
                        <q-icon name="visibility" color="white" @click="visibilidadConfirmPassword" class="pointer"/>
                      </template>
                    </q-input>
                 </div>
              </div>
              <div class="row justify-center">
                 <q-slide-transition>
                 <div class="col-9 q-ml-md" v-show="validaConfirmaContrasena">
                    <label class="font_advertencia"> {{validaConfirmaContrasena}} </label><q-icon class="q-pl-sm" name="info" style="color: white; font-size: 1em;" />
                 </div>
                 </q-slide-transition>
              </div>
              <div class="row justify-center q-mt-md text-center" v-if="!opcion">
                 <div class="col-9">
                     <q-checkbox class="font_checkbox" keep-color v-model="cyan" size="xs" label="keep Me Logged In" color="pink-8" />
                 </div>
              </div>
              <div class="row justify-center q-mt-md text-center">
                 <div class="col-9" v-if="!opcion">
                      <label class="font_register pointer" @click="flagRegister">Register</label>
                 </div>
                 <div class="col-9" v-if="opcion">
                      <label class="font_register pointer" @click="flagLogin">Back login</label>
                 </div>
              </div>
              <div class="row justify-center q-mt-md text-center q-mt-xl" style="height: 100px">
                 <div class="col-9">
                     <q-btn rounded color="pink-12" class="full-width" text-color="white" label="Login" @click="login" v-if="!opcion">
                       <div v-show="spinnerGenerar"><q-spinner-pie class="q-ml-sm" color="pink-1" /></div>
                      </q-btn>
                       <q-btn rounded color="pink-12" class="full-width" text-color="white" label="New Account" @click="crearCuenta" v-if="opcion">
                       <div v-show="spinnerGenerar"><q-spinner-pie class="q-ml-sm" color="pink-1" /></div>
                      </q-btn>
                      <!-- <q-btn rounded color="pink-12" class="full-width" text-color="white" label="token" @click="prueba"/> -->
                 </div>
              </div>
            </div>
          </div>
          </div>
       </div>
    <!-- </q-form> -->
  </q-page>
</template>

<script lang="">
import { api } from 'boot/axios'
import { defineComponent, ref, onMounted } from 'vue'
import { Notificacion } from '../javascript/notification.js'
import { SessionStorage, useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import logoutApi from '../javascript/logoutApi'

export default defineComponent({
  setup () {
    const router = useRouter()
    const $q = useQuasar()
    const { sessionToken, logout } = logoutApi()
    const opcion = ref(false)
    const data = ref(null)
    const nombre = ref('')
    const contrasena = ref('')
    const confirmContrasena = ref('')
    const validaConfirmaContrasena = ref('')
    const validaNombre = ref('')
    const validaContrasena = ref('')
    const spinnerGenerar = ref(false)
    const visibilidad = ref('password')
    const visibilidadConfirm = ref('password')

    const flagRegister = () => {
      opcion.value = true
      nombre.value = ''
      contrasena.value = ''
      confirmContrasena.value = ''
      validaNombre.value = ''
      validaContrasena.value = ''
      validaConfirmaContrasena.value = ''
    }

    const flagLogin = () => {
      opcion.value = false
      nombre.value = ''
      contrasena.value = ''
      validaNombre.value = ''
      validaContrasena.value = ''
      validaConfirmaContrasena.value = ''
    }

    /* generar cuenta */
    // const sessionToken = computed({
    //   get: () => $store.state.jwt.sessionToken,
    //   set: val => {
    //     $store.commit('jwt/sessionJwt', val)
    //   }
    // })

    const crearCuenta = () => {
      if (validarRegistroCuenta()) {
        generarCuenta()
      }
    }

    const generarCuenta = () => {
      const data = { name: nombre.value, pass: contrasena.value, confirmPass: confirmContrasena.value }
      api.post('user', data, { withCredentials: true }).then((response) => {
        cleanData()
        console.log(response.data)
        Notificacion('Successfully Account ' + response.data + ' Generated', 'cyan-10')
      }).catch(error => {
        console.log(error.response)
        if (error.response.status === 400) {
          Notificacion(error.response.data.error, 'red-10')
        } else {
          Notificacion('Server error communicating with support', 'red-10')
        }
      })
    }

    const cleanData = () => {
      nombre.value = ''
      contrasena.value = ''
      confirmContrasena.value = ''
      validaNombre.value = ''
      validaContrasena.value = ''
      validaConfirmaContrasena.value = ''
    }

    const validarRegistroCuenta = () => {
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

      if (confirmContrasena.value === '') {
        validacion = false
        validaConfirmaContrasena.value = 'Confirm password is required'
      } else if (confirmContrasena.value.length > 8) {
        validacion = false
        validaConfirmaContrasena.value = 'Confirm password should not exceed 8 characters'
      } else {
        validaConfirmaContrasena.value = ''
      }

      if (contrasena.value !== confirmContrasena.value && confirmContrasena.value !== '' && contrasena.value !== '') {
        Notificacion('password are different', 'red-10')
        validacion = false
      }
      return validacion
    }

    /* */
    const login = () => {
      spinnerGenerar.value = true
      if (validarCuenta()) {
        guardarCuenta()
        spinnerGenerar.value = false
      } else {
        spinnerGenerar.value = false
      }
    }

    const guardarCuenta = () => {
      const data = { name: nombre.value, pass: contrasena.value }
      api.post('login', data, { withCredentials: true }).then((response) => {
      // api.post('login', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}).then((response) => {
        console.log(response.data)
        saveTokens(response.data.token)
        Notificacion('Successfully Generated', 'cyan-10')
        router.push({ name: 'perfil' })
      }).catch(error => {
        console.log(error)
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

    const visibilidadConfirmPassword = () => {
      visibilidadConfirm.value = 'text'
      setTimeout(() => { visibilidadConfirm.value = 'password' }, 2000)
    }

    // const saveTokens = (token: string, tokenRefresh: string) => {
    //   SessionStorage.set("token", token)
    //   SessionStorage.set("tokenRefresh", tokenRefresh)
    // }

    onMounted(logout)

    const saveTokens = (token) => {
      SessionStorage.set('token', token)
      sessionToken.value = SessionStorage.getItem('token')
    }

    const notificacion = (mensaje) => {
      $q.notify({
        message: mensaje,
        color: 'purple'
      })
    }

    return {
      data,
      nombre,
      contrasena,
      confirmContrasena,
      validaNombre,
      validaContrasena,
      validaConfirmaContrasena,
      cyan: ref(true),
      spinnerGenerar,
      crearCuenta,
      generarCuenta,
      validarCuenta,
      guardarCuenta,
      login,
      visibilidad,
      visibilidadConfirm,
      visibilidadPassword,
      visibilidadConfirmPassword,
      notificacion,
      flagRegister,
      flagLogin,
      opcion,
      sessionToken
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
