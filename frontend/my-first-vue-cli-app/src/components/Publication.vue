<template>
<div>
  <a v-on:click="deleteStorage()">Déconnexion</a>
  <div class="creaPublication">
    <p>Poster une publication</p>
    <input type="text" v-model="messageUser"/>
    <button v-on:click="createPost()">Poster</button>
  </div>
<div class="publication"  v-for="post in post" :key="post[i]" >
    <router-link v-bind:to='"/publication/"+post.id' >
    <div>
    
      <p>{{post.prenom}} {{post.nom}}</p>
      <h2>{{post.texte}}</h2>
      <p>{{post.date}}</p>
   </div>
   </router-link>
         <button v-if="parseInt(idUser)===parseInt(post.user_id)"  v-on:click="deletePublication(post.id)"> Supprimer</button>
       <span v-else ></span>
        <button v-if="parseInt(idUser)===parseInt(post.user_id)" v-on:click="showInput()"> Modifier</button>
      <div class="modif" v-if="show==true && parseInt(idUser)===parseInt(post.user_id)">
         <input type="text" v-model="messageUser"/>
        <button   v-on:click="modifyPublication(post.id)">Envoyer</button>
       
        </div>
        <span v-else ></span>
</div>
</div>

</template>

<script>



const axios = require('axios');
const token=localStorage.getItem("token");
//alert("haut"+ token)
axios.interceptors.request.use(
  config=>{
    config.headers.authorization=`Bearer ${token}`;
    return config
  },
  error => {return Promise.reject(error)}
)

export default {
  name: 'publicationUser',
    data(){
    return {
      show:null,
      userVerif:'',
      idUser:null,
      messageUser:'',
      imageUser:null,
      id_publication:0,
      post:[]
      }
  },

    async created(){

                axios.get("http://localhost:3000/api/user/currentUser/get")
      .then(response=>{
          this.idUser=response.data.userId;
          //alert(response.data.userId)
         }).catch();

      //  alert(localStorage.getItem('token'))
              axios.get("http://localhost:3000/api/publication")
      .then(response=>{
       
         if(localStorage.getItem('token')!==null){
        for(let i=0;i<response.data.length;i++){
        this.post.push(response.data[i]);console.log(response.data[i])
           }
         }
         console.log(response.data);
      

      }).catch();
     
  },
 methods:{
          createPost(){
            axios.post('http://localhost:3000/api/publication',
            {id:this.idUser, message:this.messageUser,image:this.imageUser})
            .then(response =>{
               console.log("Ajouté"+response);
               this.$router.go()
            })
        },

        deletePublication(param){
           axios.delete('http://localhost:3000/api/publication/'+param)
           .then(response=>{ console.log(response); 
             console.log("supprimé"+response)
          this.$router.go()
           });       
        },
        modifyPublication(param){
           axios.put('http://localhost:3000/api/publication/'+param,
            {id:param, texte:this.messageUser,image:this.imageUser})
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
     showInput(){
       this.show=true;
     }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.publication{
  border:1px solid black;
  text-align:center;
  width:50%;
  margin:10px;
}
</style>
