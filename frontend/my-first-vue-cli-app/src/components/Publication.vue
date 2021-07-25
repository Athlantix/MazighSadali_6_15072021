<template>
  <div class="contain">
    <div class="menu">
      <router-link to="/profil" class="routerLink">Profil</router-link>
      <a v-on:click="deleteStorage()">Déconnexion</a>
    </div>
    <div class="logo">
      <img
        src="../assets/icon-above-font.png"
      />
    </div>
    <div class="accueil">
      <h1>Bienvenue: {{ prenom }} {{ nom }}</h1>
      <div class="creaPublication">
        <form @submit.prevent="createPost()" enctype="multipart/form-data">
          <p>
            Poster une publication
           
          </p>
           <textarea type="text" v-model="messageUser" ></textarea><label
              for="file"
              class="label"
            >
            </label><br/>
            <input class="file"
              type="file"
              accept="image/*"
              ref="file"
              @change="uploadImage()"
            /><br />
            <button>Poster</button>
        </form>
      </div>
      <div class="publication" v-for="post in post" :key="post[i]">
        <router-link v-bind:to="'/publication/' + post.id" class="router">
          <div class="router">
            <p>{{ post.prenom }} {{ post.nom }} : {{ post.poste }}</p>

            <h2 v-if="post.texte !== null">{{ post.texte }}</h2>
            <br />
            <img :src="post.image" class="image" /><br />
            <i>{{ post.date }}</i>
          </div>
        </router-link>

        <button
          v-if="parseInt(idUser) === parseInt(post.user_id) || userAcces === 1"
          v-on:click="deletePublication(post.id)"
        >
          Supprimer
        </button>
        <span v-else></span>
        <button
          v-if="parseInt(idUser) === parseInt(post.user_id)"
          v-on:click="showInput(post.id)">
          Modifier
        </button>
        <div
          class="class"
          v-if="show == true && parseInt(idUser) === parseInt(post.user_id)"
        >
          <form
            @submit.prevent="modifyPublication(post.id)"
            enctype="multipart/form-data"
          >
            <input  type="text"  ref="texte" v-model="messageUserModif" v-if="value===post.id"/>
            
            <label for="file" class="label"></label>
            <input type="file" @change="previewFiles" multiple tabindex="-1" v-if="value===post.id" />
            <button v-if="value===post.id">Envoyer</button>
            
          </form>
        </div>
        <span v-else></span>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
const token = localStorage.getItem("token");
//alert("haut"+ token)
axios.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  name: "publicationUser",
  data() {
    return {
      value:'',
      prenom: "",
      nom: "",
      show: null,
      userAcces: "",
      idUser: null,
      messageUser: "",
      messageUserModif: "",
      file: "",
      fileModif: "",
      id_publication: 0,
      post: [],
    };
  },

//affectation des données utilisateurs et implémentation du tableau post contenant les données à afficher
  async created() {
    axios
      .get("http://localhost:3000/api/user/currentUser/get")
      .then((response) => {
        this.idUser = response.data.userId;
        this.userAcces = response.data.userAcces;
        this.prenom = response.data.dataPrenom;
        this.nom = response.data.dataNom;
      })
      .catch();
    axios
      .get("http://localhost:3000/api/publication")
      .then((response) => {
        if (localStorage.getItem("token") !== null) {
          for (let i = 0; i < response.data.length; i++) {
            this.post.push(response.data[i]);
            console.log(response.data[i]);
          }
        }
        console.log(response.data);
      })
      .catch();
  },
  methods: {
    // récupération de l'image a upload de l'input création publication 
    uploadImage() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },
    // récupération de l'image a upload parmis tout les input de modifications de publication
    previewFiles(event) {
      this.fileModif = event.target.files[0];
      console.log(event.target.files[0]);
    },

    //création d'une publication
    createPost() {
      if (this.file === "") {
        this.imageUser = "";
        axios
          .post("http://localhost:3000/api/publication", {
            id: this.idUser,
            message: this.messageUser,
            image: "",
          })
          .then((response) => {
            console.log("Ajouté" + response);
            this.$router.go();
          });
      } else {
        const formData = new FormData();
        formData.append("image", this.file);

        formData.append("id", this.idUser);
        formData.append("message", this.messageUser);
        console.log(this.file);
        axios
          .post("http://localhost:3000/api/publication", formData)
          .then((response) => {
            console.log("Ajouté" + response);
            this.$router.go();
          });
      }
    },
    //suppression d'une publication
    deletePublication(param) {
      axios
        .delete("http://localhost:3000/api/publication/" + param)
        .then((response) => {
          console.log(response);
          console.log("supprimé" + response);
          this.$router.go();
        });
    },
    //modification d'une publication
    modifyPublication(param) {
      if (this.fileModif === "") {
        this.imageUser = "";
        axios
          .put("http://localhost:3000/api/publication/" + param, {
            id: param,
            texte: this.messageUserModif,
            image: "",
          })
          .then((response) => {
            console.log("Ajouté" + response);
            this.$router.go();
          });
      } else {
        console.log(this.fileModif);
        const formData = new FormData();
        formData.append("image", this.fileModif);
        formData.append("id", param);
        formData.append("texte", this.messageUserModif);

        axios
          .put("http://localhost:3000/api/publication/" + param, formData)
          .then((response) => {
            console.log(response);
            console.log("supprimé" + response);
            this.$router.go();
          });
      }
    },
    //suppression du localStorage et redirection vers la page de connexion
    deleteStorage() {
      localStorage.clear();
      this.idUser = null;
      document.location.href = "/";
    },
    //affichage de l'input selectionné par le click du bouton modifier
    showInput(param) {
      this.show = true;
      this.value=param;
      console.log(this.value)
    
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.contain {
  width: 100%;
}

.accueil {
  width: 90%;
  text-align: center;
  margin: 0 auto;
}
p {
  color: black;
}
.router {
  color: black;
  text-decoration: none;
}
.publication {

  text-align: center;
  width: 70%;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-radius: 15px;
  box-shadow: 2px 3px 5px rgb(196, 196, 196);
}
.image {
  width: 30%;
}
.menu {
  padding: 10px;
  color: white;
  display: flex;
  background-color: #fd2d01;
  justify-content: center;
  justify-content: flex-end;
}
.routerLink {
  text-decoration: none;
  margin-right: 1%;
  color: white;
}

.router p {
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 20px;
  background-color: #fd2d01;
  border-radius: 15px 15px 0px 0px;
  padding:10px;
  color:white;
}
h2 {
  padding: 10px;
}
button {
  padding: 5px;
   background-color: white;
  border: 1px solid #fd2d01;
  color: #fd2d01;
  margin: 15px;
  
}
.logo {

  text-align: center;
  margin-top: 40px;
  margin-bottom: 40px;
}
.logo img{
  width:40%;
}

h1{
  margin-bottom: 140px;;
}
textarea{
  width:50%;
  height:100px;
  margin-bottom:10px;
  font-size:20px;
}

</style>
