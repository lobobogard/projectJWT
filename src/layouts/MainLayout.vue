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
        <q-item-label header>
          Essential Links
        </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
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

import { defineComponent, computed } from 'vue'
import logoutApi from '../javascript/logoutApi'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const { logout, sessionToken } = logoutApi()
    const $store = useStore()

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
