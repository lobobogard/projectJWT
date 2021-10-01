<template>
  <div class="row q-mt-md justify-center" style="height: 0px">
    <div class="col-8 col-sm-3">
     <div class="row shadow-2 redondo bg-dark">
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
        <div class="row justify-center">
            <q-slide-transition>
            <div class="col-9 q-ml-md" v-show="validaContrasena">
              <label class="font_advertencia"> {{validaContrasena}} </label><q-icon class="q-pl-sm" name="info" style="color: white; font-size: 1em;" />
            </div>
            </q-slide-transition>
        </div>
          <div class="row justify-center q-mt-md">
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
        <div class="row justify-center q-mt-md text-center">
            <div class="col-9">
                <label class="font_register pointer" @click="opcionLoginRegister = !opcionLoginRegister" style="text-decoration:underline">LOGIN</label>
            </div>
        </div>
        <div class="row justify-center q-mt-md text-center q-mt-xl" style="height: 100px">
            <div class="col-9">
                  <q-btn rounded color="pink-12" class="full-width" text-color="white" label="New Account" @click="crearCuenta">
                  <div v-show="spinnerGenerar"><q-spinner-pie class="q-ml-sm" color="pink-1" /></div>
                </q-btn>
            </div>
         </div>
       </div>
      </div>
    </div>
  </div>
</template>

<script lang="">
import { api } from 'boot/axios'
import { defineComponent, ref, computed } from 'vue'
import { Notificacion } from '../javascript/notification.js'
import { useQuasar } from 'quasar'
import logoutApi from '../javascript/logoutApi'
import { useStore } from 'vuex'

export default defineComponent({
  setup () {
    const $store = useStore()
    const $q = useQuasar()
    const { sessionToken } = logoutApi()
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

    const crearCuenta = () => {
      if (validarRegistroCuenta()) {
        spinnerGenerar.value = true
        generarCuenta()
      }
    }

    const generarCuenta = () => {
      const data = { name: nombre.value, pass: contrasena.value, confirmPass: confirmContrasena.value }
      api.post('user', data, { withCredentials: true }).then((response) => {
        cleanData()
        console.log(response.data)
        Notificacion('Successfully Account ' + response.data + ' Generated', 'cyan-10')
        spinnerGenerar.value = false
      }).catch(error => {
        spinnerGenerar.value = false
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
        Notificacion('passwords not match', 'red-10')
        validacion = false
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
      confirmContrasena,
      validaNombre,
      validaContrasena,
      validaConfirmaContrasena,
      spinnerGenerar,
      crearCuenta,
      generarCuenta,
      visibilidad,
      visibilidadConfirm,
      visibilidadPassword,
      visibilidadConfirmPassword,
      notificacion,
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
