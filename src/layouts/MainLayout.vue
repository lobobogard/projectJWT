<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-black">
      <q-toolbar>
        <q-btn v-if="jwt" flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer"/>

        <q-toolbar-title v-if="jwt">
          Menu
        </q-toolbar-title>

        <div v-if="jwt"> <q-icon name="logout" class="text-red pointer" style="font-size: 32px;" @click="logout"/></div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" bordered class="bg-dark text-white">
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
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

import { useRouter } from 'vue-router'
import { defineComponent, computed } from 'vue'
import { SessionStorage } from 'quasar'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const router = useRouter()
    const $store = useStore()

    const logout = () => {
      SessionStorage.set('token', '')
      jwt.value = ''
      router.push({ name: 'index' })
    }

    const jwt = computed({
      get: () => {
        return $store.state.jwt.sessionToken
      },
      set: val => {
        $store.commit('jwt/sessionJwt', val)
      }
    })

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
      jwt,
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
