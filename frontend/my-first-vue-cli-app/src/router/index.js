import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
  {
  path: '/accueil',
   name: 'Accueil',
    component: () => import( '../views/accueil.vue')
  }, 
  {
    path: '/signin',
    name: 'Signin',
 
    component: () => import('../views/signin.vue')
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
  },
  {
    path: '/publication/:id',
     name: 'OnePublication',
      component: () => import( '../views/commentaire.vue')
    }, 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
