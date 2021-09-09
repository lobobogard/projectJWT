// import { RouteRecordRaw } from 'vue-router'
import multiguard from 'vue-router-multiguard'
import { SessionStorage } from 'quasar'

const guard = (to, from, next) => {
  console.log(SessionStorage.getItem('token'))
  if (!SessionStorage.getItem('token')) {
    next({ name: '' })
  } else {
    next()
  }
}
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/Index.vue') },
      { path: 'perfil', name: 'perfil', component: () => import('src/pages/perfil.vue'), beforeEnter: multiguard([guard]) }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
