import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/index.vue')
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: () => import('../views/perfil.vue')
    },
    {
      path: '/proyectos',
      name: 'proyectos',
      component: () => import('../views/dashboard.vue')
    },
    {
      path: '/proyectos/:id',
      name: 'proyecto',
      component: () => import('../views/proyecto.vue')
    },

  ]
})

export default router