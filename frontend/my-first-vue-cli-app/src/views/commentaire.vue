<template>
  <div id='App'>

    <OnePublicationUser />
       
  </div>
</template>

<script>

import OnePublicationUser from '@/components/OnePublication.vue'

export default {
  name: 'App',
  components: {
    OnePublicationUser
  },
    methods: {
      deleteStorage () {
          localStorage.clear();
          document.location.href = "/";
      }
    }
}

</script>
