<template>
    <div>
    <p>Email: <input type="texte"  v-model="email"/></p>
    <p>Mot de passe <input type="texte" v-model="password"/></p>
    <button v-on:click="checkForm"> <router-link to="/accueil" >Valider</router-link></button>
   </div>
</template>

<script>
const axios = require('axios');
export default {
    name: 'postLogin',
    data(){
    return {
        email:'',
        password:''
        }
    },
      methods:{
             
        checkForm(){
            axios.post('http://localhost:3000/api/user/login',
            {email:this.email, password:this.password})
            .then(response =>{
                localStorage.setItem("token",response.data.token)
                localStorage.setItem("userId",response.data.userId)
                let dataUser=[{nom:response.data.nom,prenom:response.data.prenom,poste:response.data.poste,acces:response.data.acces}]
                localStorage.setItem("infoUser",JSON.stringify(dataUser))
                  document.location.reload();
            })
        }
      }

}


</script>
