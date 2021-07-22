<template>

  <div id="App">
    <router-link to="/">Connexion</router-link> 
    <router-link to="/signin">S'inscrire</router-link>
    <postLogin/>
    
    

  </div>
</template>

<script>

import postLogin from '@/components/PostLogin.vue'


export default {
  name: 'App',
  components: {
    postLogin
   
  }
}
</script>