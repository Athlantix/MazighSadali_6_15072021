<template>
 
 <div class="login">
  <a v-on:click="deleteStorage()">Déconnexion</a>
     
   <p>Nom: {{nomUser}}</p>
   <p>Prénom: {{prenomUser}}</p>
    <p>Poste: {{posteUser}}</p>
    <p>Acces: {{accesUser}}</p>

     <button v-on:click="showInput()"> Modifier</button>
     <div class="modif_user" v-if="show===true">
        <p>Nom: <input type="texte" v-model="nomUser"/></p>
       <p>Prénom:<input type="texte" v-model="prenomUser"/></p>
    <p>Poste: <input type="texte" v-model="posteUser"/></p>
    <button v-on:click="modifyUser()">Envoyer</button>
   
  

     </div>
      <button v-on:click="deleteUser(idUser)">Supprimer compte</button>
  </div>
</template>

<script>

const axios = require('axios');
const token=localStorage.getItem("token");
axios.interceptors.request.use(
  config=>{
    config.headers.authorization=`Bearer ${token}`;
    return config
  },
  error => {return Promise.reject(error)}
)

export default {
    name: 'profil',
    data(){
    return {
        show:false,
        nomUser:'',
        prenomUser:'',
        posteUser:'',
        accesUser:'',
        idUser:''
      
        }
    },
        async created(){
          axios.get("http://localhost:3000/api/user/currentUser/get")
      .then(response=>{
         this.nomUser=response.data.dataNom
             this.prenomUser=response.data.dataPrenom
             this.posteUser=response.data.dataPoste
             this.accesUser=response.data.userAcces
             this.idUser=response.data.userId
         }).catch();

  },
  methods:{
    showInput(){
      this.show=true;
    },
    modifyUser(){
       axios.put('http://localhost:3000/api/user',
            {id:this.idUser, nom:this.nomUser,prenom:this.prenomUser,poste:this.posteUser})
           .then(response=>{ console.log(response); 
             console.log("supprimé"+response)
          this.$router.go()
           }); 
    },
     deleteStorage () {
        localStorage.clear();
        this.idUser=null;
        document.location.href = "/";
      },

      deleteUser(param){
           axios.delete('http://localhost:3000/api/user/'+param)
           .then(response=>{ console.log(response); 
             console.log("supprimé"+response)
            document.location.href = "/";
           }); 
      }
  }
  

}

</script>