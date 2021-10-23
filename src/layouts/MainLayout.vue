<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-black">
      <q-toolbar>
        <q-btn v-if="sessionToken" flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer"/>

        <q-toolbar-title v-if="sessionToken">
          Menu
        </q-toolbar-title>

        <div v-if="sessionToken">
          <q-icon name="logout" class="text-red pointer" style="font-size: 32px;" @click="logout()">
            <q-tooltip>
              Exit System
            </q-tooltip>
          </q-icon>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="drawer" bordered class="bg-dark text-white" v-if="sessionToken">
      <q-list>
         <q-slide-transition>
        <q-item-label header v-if="!showTextJWT">
          <textJWT />
        </q-item-label>
         </q-slide-transition>

      <div class="text-center">
        <q-toggle v-model="showTextJWT" checked-icon="thumb_up_off_alt" unchecked-icon="thumb_down_off_alt" size="lg">
          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
            <strong>{{showTextJWT ? "SHOW THE SENTENCE BUT IT WILL PERFORM POORLY" : "HIDE THE SENTENCE FOR BETTER PERFORMANCE" }}</strong>
          </q-tooltip>
        </q-toggle>
      </div>
        <EssentialLink class="q-mt-md" v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Information',
    caption: 'Info about System',
    icon: 'info',
    link: 'information'
  },
  {
    title: 'Company',
    caption: 'Capture Company (User)',
    icon: 'location_city',
    link: 'company'
  },
  {
    title: 'Perfil',
    caption: 'Capture Perfil (User)',
    icon: 'school',
    link: 'perfil'
  },
  {
    title: 'Estadistic',
    caption: 'Check Estadistic (User)',
    icon: 'insert_chart_outlined',
    link: 'estadistic'
  },
  {
    title: 'Token',
    caption: 'Options token (Admin)',
    icon: 'token',
    link: 'token'
  },
  {
    title: 'Validation',
    caption: 'Options validation (Admin)',
    icon: 'build',
    link: 'validation'
  },
  {
    title: 'Concurrency',
    caption: 'Options concurrency (Admin)',
    icon: 'tips_and_updates',
    link: 'concurrency'
  }
]

import textJWT from 'components/textJWT.vue'
import { defineComponent, computed, ref } from 'vue'
import logoutApi from '../javascript/logoutApi'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink, textJWT
  },
  setup () {
    const { logout, sessionToken } = logoutApi()
    const $store = useStore()
    const showTextJWT = ref(false)

    const drawer = computed({
      get: () => {
        return $store.state.jwt.toggleDrawer
      },
      set: val => {
        $store.commit('jwt/toggleLogin', val)
      }
    })

    const toggleLeftDrawer = () => {
      drawer.value = !drawer.value
    }

    return {
      showTextJWT,
      sessionToken,
      essentialLinks: linksList,
      toggleLeftDrawer,
      logout,
      drawer
    }
  }
})
</script>

<style>
.pointer {
  cursor: pointer
}
</style>
