// import { RouteRecordRaw } from 'vue-router'
import multiguard from 'vue-router-multiguard'
import { SessionStorage } from 'quasar'
import { Notificacion } from '../javascript/notification.js'

const guard = (to, from, next) => {
  const token = SessionStorage.getItem('token')
  if (!token || token === null) {
    Notificacion('unauthorized access', 'red-10')
    next({ name: 'index' })
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
      { path: 'company', name: 'company', component: () => import('src/pages/company.vue'), beforeEnter: multiguard([guard]) },
      { path: 'perfil', name: 'perfil', component: () => import('src/pages/perfil.vue'), beforeEnter: multiguard([guard]) },
      { path: 'token', name: 'token', component: () => import('src/pages/token.vue'), beforeEnter: multiguard([guard]) },
      { path: 'validation', name: 'validation', component: () => import('src/pages/validation.vue'), beforeEnter: multiguard([guard]) }
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
