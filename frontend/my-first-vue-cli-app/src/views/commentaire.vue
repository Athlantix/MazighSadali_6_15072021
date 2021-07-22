<template>
  <div id='App'>
 <router-link to="/accueil">Acceuil</router-link>
<router-link to="/profil">Profil</router-link>
  <router-link to="/">Déconnexion</router-link>
  <OnePublicationUser />
       
    </div>
</template>

<script>

import OnePublicationUser from '@/components/OnePublication.vue'

export default {
  name: 'App',
  components: {
    OnePublicationUser
  }
}

</script>
