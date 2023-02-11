
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
      path: '/contact',
      name: 'contact',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/contacto.vue')
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