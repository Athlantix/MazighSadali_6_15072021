<template>
<div>

  <div class="creaPublication">
    <p>Poster une publication</p>
    <input type="text" v-model="messageUser"/>
    <button v-on:click="createPost()">Poster</button>
  </div>
<div class="publication"  v-for="post in post" :key="post[i]" >
    <router-link v-bind:to='"/publication/"+post.id' >
    <div>
      <h2>{{post.user_id}}</h2>
      <p>{{post.texte}}</p>
      <p>{{post.date}}</p>
   </div>
   </router-link>
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
  name: 'publicationUser',
    data(){
    return {
      idUser:localStorage.getItem('userId'),
      messageUser:'',
      imageUser:null,
      id_publication:0,
      post:[]
      }
  },

 
      async created(){
  
    axios.get("http://localhost:3000/api/publication")
      .then(response=>{
         if(localStorage.getItem('token')!==null){
        for(let i=0;i<response.data.length;i++){
        this.post.push(response.data[i]);console.log(response.data[i])
        }
         }
         console.log(response.data)
      }).catch();
    
  },
 methods:{
          createPost(){
            axios.post('http://localhost:3000/api/publication',
            {id:this.idUser, message:this.messageUser,image:this.imageUser})
            .then(response =>{
               console.log("Ajouté"+response);
               document.location.reload();
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
