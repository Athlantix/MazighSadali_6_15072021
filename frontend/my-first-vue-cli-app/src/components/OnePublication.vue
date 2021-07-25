<template>
  <div>
    <div class="menu">
      <router-link to="/accueil" class="routerLink">Acceuil</router-link>
      <router-link to="/profil" class="routerLink">Profil</router-link>
      <router-link v-on:click="deleteStorage()" to="/" class="routerLink"
        >Déconnexion</router-link
      >
    </div>
    <div class="publication" v-for="onePost in onePost" :key="onePost[i]">
      <h2>{{ onePost.prenom }} {{ onePost.nom }} : {{ onePost.poste }}</h2>
      <p>{{ onePost.texte }}</p>
      <img :src="onePost.image" class="image" /><br />
      <i>{{ onePost.date }}</i>
    </div>
    <div class="centreCom">
      <div class="creaPublication">
        <p>
          Ecrivez un commentaire<input
            type="text"
            v-model="commentaireUser"
          /><button v-on:click="createCommentairePost()">Poster</button>
        </p>
      </div>
    </div>
    <div
      class="commentaire"
      v-for="commentaire in commentaire"
      :key="commentaire[i]"
    >
      <h2>{{ commentaire.prenom }} {{ commentaire.nom }}</h2>
      <p>{{ commentaire.message }}</p>
      <button
        v-if="
          parseInt(id_user) === parseInt(commentaire.user_id) || userAcces === 1
        "
        v-on:click="deleteCommentaire(commentaire.id)"
      >
        Supprimer
      </button>
      <span v-else></span>
    </div>
  </div>
</template>




<script>
const axios = require("axios");
const token = localStorage.getItem("token");
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
  name: "OnePublicationUser",
  data() {
    return {
      userAcces: "",
      commentaireUser: "",
      commentaire: [],
      onePost: [],
      id_user: null,
      id_publication: this.$route.params.id,
    };
  },

  //recupération des info utilisateurs, implémentation des données dans le tableau onePost contenant la publication à afficher
  async created() {
    axios
      .get("http://localhost:3000/api/user/currentUser/get")
      .then((response) => {
        this.id_user = response.data.userId;
        this.userAcces = response.data.userAcces;
      })
      .catch();
    axios
      .get("http://localhost:3000/api/publication/" + this.id_publication)
      .then((response) => {
        if (localStorage.getItem("token") !== null) {
          for (let i = 0; i < response.data.publication.length; i++) {
            this.onePost.push(response.data.publication[i]);
          }
          console.log(response.data.publication[0]);

          for (let i = 0; i < response.data.commentaire.length; i++) {
            this.commentaire.push(response.data.commentaire[i]);
          }
          console.log(response.data.commentaire);
        }
      })
      .catch();
  },
  methods: {

    //création d'une publication
    createCommentairePost() {
      let userId = this.id_user;
      console.log(userId);
      axios
        .post("http://localhost:3000/api/publication/" + this.id_publication, {
          id_user: userId,
          id_publication: this.id_publication,
          message: this.commentaireUser,
        })
        .then((response) => {
          console.log(response);
          console.log(this.id_publication);
          this.$router.go();
        });
    },

    //suppression du commentaire
    deleteCommentaire(param) {
      axios
        .delete("http://localhost:3000/api/publication/commentaire/" + param)
        .then((response) => {
          console.log(response);
          console.log("supprimé" + response);
          this.$router.go();
        });
    },

    //suppression du localStorage et redirection vers la page de connexion
    deleteStorage() {
      localStorage.clear();
      this.idUser = null;
      document.location.href = "/";
    },
  },
};
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
input,
button {
  margin: 0 auto;
}

.commentaire {
  border: 1px solid black;
  width: 50%;
  margin: 10px;
}
.image {
  width: 40%;
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
.publication {
  text-align: center;
  width: 70%;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-radius: 15px;
  border: none;
  border-radius: 15px;
  box-shadow: 2px 3px 5px rgb(196, 196, 196);
}
p {
  padding: 10px;
  font-weight: bold;
  font-size: 20px;
}
.commentaire {
  text-align: center;
  width: 70%;
  margin: 0 auto;
  margin-top: 30px;
  padding-bottom:20px;
  margin-bottom: 30px;
  border: none;
  border-radius: 15px;
  box-shadow: 2px 2px 5px rgb(196, 196, 196);
}
.centreCom {
  width: 100%;
}
.creaPublication {
  width: 300px;
  margin: 0 auto;
  margin-top: 25px;
  padding-left:50px;
}

button {
  padding: 5px;
  background-color: white;
  border: 1px solid #fd2d01;
  color: #fd2d01;
}

h2 {
  
    padding-bottom: 20px;
  background-color: #fd2d01;
  border-radius: 15px 15px 0px 0px;
  padding:10px;
  color:white;
}
</style>
