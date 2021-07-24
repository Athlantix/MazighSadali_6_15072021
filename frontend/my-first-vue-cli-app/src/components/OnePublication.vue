<template>
<div>
    <div class="publication" v-for="onePost in onePost" :key="onePost[i]">
        <h2>{{onePost.prenom}} {{onePost.nom}}</h2>
        <p>{{onePost.texte}}</p>
        <p>{{onePost.date}}</p>
    </div>
    <div class="commentaire" v-for="commentaire in commentaire" :key="commentaire[i]">
        <h2>{{commentaire.prenom}} {{commentaire.nom}}</h2>
         <p>{{commentaire.message}}</p>
         <button v-if="parseInt(id_user)===parseInt(commentaire.user_id)"  v-on:click="deleteCommentaire(commentaire.id)"> Supprimer</button>
       <span v-else ></span>
    </div>
    <div class="creaPublication">
        <input type="text" v-model="commentaireUser"/>
        <button v-on:click="createCommentairePost()">Poster</button>
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
.commentaire{
    border:1px solid black;
     width:50%;
  margin:10px;
}
</style>
