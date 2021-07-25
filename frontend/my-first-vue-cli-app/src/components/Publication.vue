<template>
<div class="contain">
  <div class="menu">
  <router-link to="/profil" class="routerLink">Profil</router-link>
  <a v-on:click="deleteStorage()">Déconnexion</a>
  </div>
  <div class='logo'>
    <img src="https://user.oc-static.com/upload/2019/09/04/15676009353158_image2.png"/>
  </div>
<div class="accueil">
  
  <h1>Bienvenue: {{prenom}} {{nom}}</h1>
    <div class="creaPublication">
        
          <form @submit.prevent="createPost()" enctype="multipart/form-data">
          <p>Poster une publication <input type="text" v-model="messageUser"/> </p>
          
          <label for="file" class="label">Ou une photo    </label>
          <input type="file" accept="image/*" ref="file" @change="uploadImage()"/><br>
          <button>Poster</button>
        </form>
    </div>
  <div class="publication"  v-for="post in post" :key="post[i]" >
      <router-link v-bind:to='"/publication/"+post.id' class="router" >
      <div class="router">
      
        <p>{{post.prenom}} {{post.nom}}</p>
        <img :src="post.image" class="image"/>
        <h2 v-if="post.texte !==null">{{post.texte}}</h2> <br>
        <i>{{post.date}}</i>
    </div>
    </router-link>

        <button v-if="parseInt(idUser)===parseInt(post.user_id) || userAcces===1 "  v-on:click="deletePublication(post.id)"> Supprimer</button>
        <span v-else ></span>
        <button v-if="parseInt(idUser)===parseInt(post.user_id)" v-on:click="showInput()"> Modifier</button>
          <div class="modif" v-if="show==true && parseInt(idUser)===parseInt(post.user_id)">

            <form @submit.prevent="modifyPublication(post.id)" enctype="multipart/form-data">
              <input type="text" v-model="messageUserModif" v-if="post.texte !==null"/>
              <label for="file" class="label" v-if="!file===''">upload</label>
              <input type="file" accept="image/*" ref="file" @change="uploadImageModif()"  v-if="post.image !==''"/>
              <button >Envoyer</button>
          </form>
        
          </div>
          <span v-else ></span>
  </div>
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
      messageUserModif:'',
      file:'',
      fileModif:'',
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

         uploadImageModif(){
             this.fileModif=this.$refs.file.files[0];
            console.log(this.file)

         },

          createPost(){

           
           if(this.file===''){
           
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

              if(this.fileModif==='' ){
             this.imageUser="";
               axios.put('http://localhost:3000/api/publication/'+param,{id:param,message:this.messageUserModif,image:''})
            .then(response =>{
               console.log("Ajouté"+response);
               this.$router.go()
            })
           }
           else{
             const formData=new FormData();
            formData.append('image',this.fileModif);
            formData.append('id',param);

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

.contain{
 width:100%
}

.accueil{
  width:90%;
  text-align:center;
  margin:0 auto;
}
p{
  color:black;

}
.router{
  color:black;
  text-decoration: none;
}
.publication{
  background-color: rgb(238, 247, 255);
  text-align:center;
  width:70%;
  margin:0 auto;
  margin-top:25px;
  padding:10px;
  border-radius: 15px;
  box-shadow: 10px 5px 5px rgb(196, 196, 196);
}
.image{
  width:30%;
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

.router p{
  font-size:20px;
  font-weight:bold;
  border-bottom: 1px solid black;
  padding-bottom:20px;
 
}
h2{
  padding:10px;
  background-color: white;
}
button{
  padding:5px;
  background-color: rgb(59, 91, 161);
  border:none;
  margin:15px;
  color:white;
}
.logo{
  text-align: center;
    margin:40px;
}
</style>
