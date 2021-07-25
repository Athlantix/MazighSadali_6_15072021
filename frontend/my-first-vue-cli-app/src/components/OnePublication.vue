<template>
<div>

  <div class="menu">
    <router-link to="/accueil" class="routerLink">Acceuil</router-link>
    <router-link to="/profil" class="routerLink">Profil</router-link>
    <router-link v-on:click="deleteStorage()" to="/"  class="routerLink">Déconnexion</router-link>
  </div>
    <div class="publication" v-for="onePost in onePost" :key="onePost[i]">
        <h2>{{onePost.prenom}} {{onePost.nom}}</h2>
        <p>{{onePost.texte}}</p>
        <img :src="onePost.image"  class="image"/><br>
         <p>{{onePost.date}}</p>
    </div>
    <div class="centreCom">
      <div class="creaPublication">
          <p>Ecrivez un commentaire<input type="text" v-model="commentaireUser"/><button v-on:click="createCommentairePost()">Poster</button></p>
          
      </div>
    </div>
    <div class="commentaire" v-for="commentaire in commentaire" :key="commentaire[i]">
        <h2>{{commentaire.prenom}} {{commentaire.nom}}</h2>
         <p>{{commentaire.message}}</p>
         <button v-if="parseInt(id_user)===parseInt(commentaire.user_id) || userAcces===1"  v-on:click="deleteCommentaire(commentaire.id)"> Supprimer</button>
       <span v-else ></span>
    </div>
   
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
  name: 'OnePublicationUser',
    data(){
    return {
      userAcces:'',
        commentaireUser:'',
        commentaire:[],
      onePost:[],
      id_user:null,
      id_publication: this.$route.params.id
      }
  },
  async created(){
     axios.get("http://localhost:3000/api/user/currentUser/get")
      .then(response=>{
          this.id_user=response.data.userId;
          this.userAcces=response.data.userAcces;
         }).catch();
    axios.get("http://localhost:3000/api/publication/"+this.id_publication)
      .then(response=>{ 
     

           if(localStorage.getItem('token')!==null){
               for(let i=0;i<response.data.publication.length;i++){
                    this.onePost.push(response.data.publication[i]);
               }
            console.log(response.data.publication[0])

            for(let i=0;i<response.data.commentaire.length;i++){
                this.commentaire.push(response.data.commentaire[i])
            }
        console.log(response.data.commentaire)
      }
    }).catch();
    
  },
    methods:{
          createCommentairePost(){
            
              let userId=this.id_user
              console.log(userId)
            axios.post('http://localhost:3000/api/publication/'+this.id_publication,
            {id_user:userId,id_publication:this.id_publication, message:this.commentaireUser})
            .then(response =>{
                console.log(response);
               console.log(this.id_publication);
               this.$router.go()
               
            })
        },
                deleteCommentaire(param){
           axios.delete('http://localhost:3000/api/publication/commentaire/'+param)
           .then(response=>{ console.log(response); 
             console.log("supprimé"+response)
          this.$router.go()
           });       
        },
           deleteStorage () {
        localStorage.clear();
        this.idUser=null;
        document.location.href = "/";
      }
  },

}
</script>







<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
input,button{
  margin:0 auto;
}
.publication{
  border:1px solid black;
  text-align:center;
  width:50%;
  margin:10px;
}
.commentaire{
    border:1px solid black;
     width:50%;
  margin:10px;
}
.image{
  width:40%;
}

.menu{
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
.publication{
  background-color: rgb(224, 241, 255);
  text-align:center;
  width:70%;
  margin:0 auto;
  margin-top:25px;
  padding:10px;
  border:none;
  border-radius: 15px;
  box-shadow: 10px 5px 5px rgb(196, 196, 196);
}
.commentaire{
  background-color: rgb(255, 229, 213);
  text-align:center;
  width:70%;
  margin:0 auto;
  margin-top:25px;
  padding:10px;
  border:none;
  border-radius: 15px;
  box-shadow: 10px 5px 5px rgb(196, 196, 196);
}
.centreCom{
  width:100%;
}
.creaPublication{
    width:200px;
     margin:0 auto;
      margin-top:25px;
}

button{
  padding:5px;
  background-color: rgb(59, 91, 161);
  border:none;
  color:white;
}

h2{
  border-bottom: 1px solid black;
  padding-bottom:20px;
}

</style>
