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
    caption: 'Capture Company',
    icon: 'location_city',
    link: 'company'
  },
  {
    title: 'Perfil',
    caption: 'Capture Perfil',
    icon: 'school',
    link: 'perfil'
  },
  {
    title: 'Token',
    caption: 'Options token',
    icon: 'token',
    link: 'token'
  },
  {
    title: 'Validation',
    caption: 'Options validation',
    icon: 'build',
    link: 'validation'
  }
  // {
  //   title: 'Discord Chat Channel',
  //   caption: 'chat.quasar.dev',
  //   icon: 'chat',
  //   link: 'https://chat.quasar.dev'
  // },
  // {
  //   title: 'Forum',
  //   caption: 'forum.quasar.dev',
  //   icon: 'record_voice_over',
  //   link: 'https://forum.quasar.dev'
  // },
  // {
  //   title: 'Twitter',
  //   caption: '@quasarframework',
  //   icon: 'rss_feed',
  //   link: 'https://twitter.quasar.dev'
  // },
  // {
  //   title: 'Facebook',
  //   caption: '@QuasarFramework',
  //   icon: 'public',
  //   link: 'https://facebook.quasar.dev'
  // },
  // {
  //   title: 'Quasar Awesome',
  //   caption: 'Community Quasar projects',
  //   icon: 'favorite',
  //   link: 'https://awesome.quasar.dev'
  // }
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
