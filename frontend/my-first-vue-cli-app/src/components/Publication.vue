<template>
<div>
  <a v-on:click="deleteStorage()">Déconnexion</a>
  <h1>Bienvenue: {{prenom}} {{nom}}</h1>
  <div class="creaPublication">
    <p>Poster une publication</p>
  

  <form @submit.prevent="createPost()" enctype="multipart/form-data">
    <input type="text" v-model="messageUser"/>
  <label for="file" class="label">upload</label>
  <input type="file" accept="image/*" ref="file" @change="uploadImage()"/>
   <button>Poster</button>
  </form>

   
  </div>
<div class="publication"  v-for="post in post" :key="post[i]" >
    <router-link v-bind:to='"/publication/"+post.id' >
    <div>
    
      <p>{{post.prenom}} {{post.nom}}</p>
      <img :src="post.image" class="image"/>
      <h2>{{post.texte}}</h2>
      <p>{{post.date}}</p>
   </div>
   </router-link>

         <button v-if="parseInt(idUser)===parseInt(post.user_id) || userAcces===1 "  v-on:click="deletePublication(post.id)"> Supprimer</button>
       <span v-else ></span>
       
      <button v-if="parseInt(idUser)===parseInt(post.user_id)" v-on:click="showInput()"> Modifier</button>
        <div class="modif" v-if="show==true && parseInt(idUser)===parseInt(post.user_id)">

          <form @submit.prevent="modifyPublication(post.id)" enctype="multipart/form-data">
            <input type="text" v-model="messageUser"/>
            <label for="file" class="label">upload</label>
            <input type="file" accept="image/*" ref="file" @change="uploadImage()"/>
            <button >Envoyer</button>
        </form>
       
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
      prenom:'',
      nom:'',
      show:null,
      userAcces:'',
      idUser:null,
      messageUser:'',
      file:'',
      id_publication:0,
      post:[],
      }
  },

    async created(){

                axios.get("http://localhost:3000/api/user/currentUser/get")
      .then(response=>{
          this.idUser=response.data.userId;
          this.userAcces=response.data.userAcces;
          this.prenom=response.data.dataPrenom
          this.nom=response.data.dataNom
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

          uploadImage(){
            this.file=this.$refs.file.files[0];
            console.log(this.file)
                  },

          createPost(){

           
           if(this.file===''){
             alert("pas définie")
             this.imageUser="";
               axios.post('http://localhost:3000/api/publication',{id:this.idUser,message:this.messageUser,image:this.imageUser})
            .then(response =>{
               console.log("Ajouté"+response);
               this.$router.go()
            })
           }else{
              const formData=new FormData();
            formData.append('image',this.file)

            formData.append('id',this.idUser);
            formData.append('texte',this.messageUser);
           console.log(this.file)
                axios.post('http://localhost:3000/api/publication',formData)
            .then(response =>{
               console.log("Ajouté"+response);
               this.$router.go()
            })
           }
           
         
        },

       

        deletePublication(param){
           axios.delete('http://localhost:3000/api/publication/'+param)
           .then(response=>{ console.log(response); 
             console.log("supprimé"+response)
          this.$router.go()
           });       
        },
        modifyPublication(param){

              if(this.file===''){
             alert("pas définie")
             this.imageUser="";
               axios.put('http://localhost:3000/api/publication/'+param,{id:this.idUser,message:this.messageUser,image:''})
            .then(response =>{
               console.log("Ajouté"+response);
               this.$router.go()
            })
           }
           else{
             const formData=new FormData();
            formData.append('image',this.file);
            formData.append('id',this.idUser);

           axios.put('http://localhost:3000/api/publication/'+param,
            formData)
           .then(response=>{ console.log(response); 
             console.log("supprimé"+response)
            this.$router.go()
           }); 
            
           }
          //-------------------



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
.image{
  width:5%;
}
</style>
