<template>
    <div id="App">
       <router-link to="/profil">Profil</router-link>
        
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
  

}

</script>