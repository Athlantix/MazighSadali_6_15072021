<template>
    <div id="App">
       <router-link to="/profil">Profil</router-link>
        <router-link v-on:click="deleteStorage()" to="/">Déconnexion</router-link>
        <publicationUser />
      
    </div>
</template>

<script>

  

import publicationUser from '@/components/Publication.vue'

export default {
  name: 'App',
  components: {
    publicationUser
  },
  
    methods: {
      deleteStorage () {
        localStorage.removeItem('token');
      }
    }
}

</script>