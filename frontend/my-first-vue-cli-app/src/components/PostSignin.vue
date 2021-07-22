<template>
    
 <div class="login">
       <router-link to="/">Connexion</router-link> |
    <router-link to="/signin">S'inscrire</router-link>
   <p>Nom: <input type="texte" v-model="nomUser"/></p>
   <p>Prénom: <input type="texte" v-model="prenomUser"/></p>
    <p>Email: <input type="texte" v-model="emailUser"/></p>
    <p>Mot de passe <input type="texte" v-model="passwordUser"/></p>
    <p>Poste: <input type="texte" v-model="posteUser"/></p>
    <button v-on:click="checkFormSign"><router-link to="/">Valider</router-link> </button>
  </div>
</template>

<script>
const axios = require('axios');
export default {
    name: 'postSignin',
    data(){
    return {
        nomUser:'',
        prenomUser:'',
        emailUser:'',
        passwordUser:'',
        posteUser:''
        }
    },
      methods:{
             
        checkFormSign(){
            axios.post('http://localhost:3000/api/user/signup',
            {nom:this.nomUser,
            prenom:this.prenomUser,
            email:this.emailUser,
            password:this.passwordUser,
            poste:this.posteUser})
            .then(response =>{
              
                 console.log(response)
            })
        }
      }
}

</script>