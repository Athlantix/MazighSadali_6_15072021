<template>
  <div class='profil'>
 <router-link to="/accueil">Acceuil</router-link>
  
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
      
}
</script>