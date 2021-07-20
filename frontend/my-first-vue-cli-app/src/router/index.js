import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
  {
  path: '/accueil',
   name: 'Accueil',
    component: () => import(/* webpackChunkName: "about" */ '../views/accueil.vue')
  }, 
  {
    path: '/signin',
    name: 'Signin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/signin.vue')
  },
  {
    path:'/',
    name:'Login',
    component:()=> import('../views/login.vue')
  },
  {
    path:'/profil',
    name:'Profil',
    component:()=> import ('../views/profil.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
