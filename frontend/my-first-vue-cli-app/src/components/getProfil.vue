<template>
    
 <div class="login">
     
   <p>Nom: {{nomUser}}</p>
   <p>Prénom: {{prenomUser}}</p>
    <p>Poste: {{posteUser}}</p>
    <button v-on:click="checkFormSign"><router-link to="/">Valider</router-link> </button>
  </div>
</template>

<script>



export default {
    name: 'profil',
    data(){
    return {
        nomUser:'',
        prenomUser:'',
        posteUser:'',
      
        }
    },
        async created(){
            let dataUser=JSON.parse(localStorage.getItem("infoUser"));
            console.log(dataUser[0].nom);
         if(localStorage.getItem('token')!==null){
             console.log("hello")
             this.nomUser=dataUser[0].nom
             this.prenomUser=dataUser[0].prenom
             this.posteUser=dataUser[0].poste
         }
  },
  

}

</script>