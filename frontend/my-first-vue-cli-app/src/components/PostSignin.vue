<template>
    
 <div class="signin">
       <div class="info">
    <router-link to="/" class="routerLink">Connexion</router-link> 
    <router-link to="/signin" class="routerLink" >S'inscrire</router-link>
  </div>
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

<style scoped lang="scss">
p{
  margin-left:20%;
}
.info{
  padding:10px;
  color:white;
  display:flex;
 background-color: black;
  justify-content: center;
  justify-content:flex-end;
  margin-bottom:50px;
  text-align: center;
}

.routerLink{
  text-decoration: none;
  margin-right:1%;
  color:white;
}

button{
  padding:5px;
  background-color: rgb(59, 91, 161);
  border:none;
  margin:15px;
  color:white;
 margin-left:20%;
}
</style>