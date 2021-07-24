<template>
    <div>
    <div class="info">
    <router-link to="/" class="routerLink">Connexion</router-link> 
    <router-link to="/signin" class="routerLink">S'inscrire</router-link>
  </div>
    <p>Email: <input type="texte"  v-model="email"/></p>
    <p>Mot de passe <input type="texte" v-model="password"/></p>
    <button v-on:click="checkForm"> Valider</button>
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
     
            localStorage.clear();
                localStorage.setItem("token",response.data.token)
                 axios.get("http://localhost:3000/api/user/currentUser/get")
      .then(response=>{   console.log(response)})
              
               // let dataUser=[{nom:response.data.nom,prenom:response.data.prenom,poste:response.data.poste,acces:response.data.acces}]
             //   localStorage.setItem("infoUser",JSON.stringify(dataUser))
             
                this.$router.push({ path: '/accueil' })
            })
        }
      }

}


</script>

<style scoped lang="scss">
.info{
  padding:10px;
  color:white;
  display:flex;
 background-color: black;
  justify-content: center;
  justify-content:flex-end;
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
}

</style>