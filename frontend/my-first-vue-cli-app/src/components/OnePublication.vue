<template>
<div>
<div class="publication">
  <h2>{{id_user}}</h2>
  <p>{{onePost}}</p>
  <p>{{onePost}}</p>
</div>
<div class="commentaire"></div>
    <h2>{{commentaire}}</h2>
    <div class="creaPublication">
    <p>Poster un commentaire</p>
    <input type="text" v-model="commentaireUser"/>
    <button v-on:click="createCommentairePost()">Poster</button>
  </div>
</div>

</template>

<script>
const axios = require('axios');
const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjM0LCJhY2NlcyI6MiwiaWF0IjoxNjI2ODYzOTgyLCJleHAiOjE2MjY5NTAzODJ9.EOuuucW10a9qeN_PcwWOeGHE0AKls45_UNJ9_-by-4s'

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
  
    axios.get("http://localhost:3000/api/publication/"+this.id_publication)
      .then(response=>{  if(localStorage.getItem('token')!==null){
        
        this.onePost.push(response.data.publication[0]);
        this.id_user=response.data.publication[0].user_id;
        this.commentaire.push(response.data.commentaire)
        console.log(response.data.commentaire)

      }
      }).catch();
    
  },
    methods:{



          createCommentairePost(){
            axios.post('http://localhost:3000/api/publication/'+this.id_publication,
            {id_user:this.id_user,id_publication:this.id_publication, message:this.commentaireUser})
            .then(response =>{
               console.log("Ajouté"+response)
            })
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
