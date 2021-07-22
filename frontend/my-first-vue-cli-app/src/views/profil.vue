<template>
  <div class='profil'>
 <router-link to="/accueil">Acceuil</router-link>
  <router-link v-on:click="deleteStorage()" to="/">Déconnexion</router-link>
  <profil/>
  </div>
</template>

<script>

import profil from '@/components/getProfil.vue'


export default {
  name: 'App',
  components: {
    profil
   
  },
      methods: {
      deleteStorage () {
        localStorage.removeItem('token');localStorage.removeItem('userId');localStorage.removeItem('infoUser');
      }
    }
}
</script>