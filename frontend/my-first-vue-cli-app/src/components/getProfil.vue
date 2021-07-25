<template>
  <div class="login">
    <div class="menu">
      <router-link to="/accueil" class="routerLink">Acceuil</router-link>
      <a v-on:click="deleteStorage()">Déconnexion</a>
    </div>

    <b
      >Nom: <span>{{ nomUser }}</span></b
    ><br />
    <b
      >Prénom: <span>{{ prenomUser }}</span></b
    >
    <br />
    <b
      >Poste: <span>{{ posteUser }}</span></b
    >
    <br />
    <b
      >Acces: <span>{{ accesUser }}</span></b
    ><br />

    <button v-on:click="showInput()">Modifier</button>
    <div class="modif_user" v-if="show === true">
      <p>Nom: <input type="texte" v-model="nomUser" /></p>
      <p>Prénom:<input type="texte" v-model="prenomUser" /></p>
      <p>Poste: <input type="texte" v-model="posteUser" /></p>
      <button v-on:click="modifyUser()">Envoyer</button>
    </div>
    <button v-on:click="deleteUser(idUser)">Supprimer compte</button>
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
  name: "profil",
  data() {
    return {
      show: false,
      nomUser: "",
      prenomUser: "",
      posteUser: "",
      accesUser: "",
      idUser: "",
    };
  },
  async created() {
    axios
      .get("http://localhost:3000/api/user/currentUser/get")
      .then((response) => {
        this.nomUser = response.data.dataNom;
        this.prenomUser = response.data.dataPrenom;
        this.posteUser = response.data.dataPoste;
        this.accesUser = response.data.userAcces;
        this.idUser = response.data.userId;
      })
      .catch();
  },
  methods: {
    showInput() {
      this.show = true;
    },
    modifyUser() {
      axios
        .put("http://localhost:3000/api/user", {
          id: this.idUser,
          nom: this.nomUser,
          prenom: this.prenomUser,
          poste: this.posteUser,
        })
        .then((response) => {
          console.log(response);
          console.log("supprimé" + response);
          this.$router.go();
        });
    },
    deleteStorage() {
      localStorage.clear();
      this.idUser = null;
      document.location.href = "/";
    },

    deleteUser(param) {
      axios
        .delete("http://localhost:3000/api/user/" + param)
        .then((response) => {
          console.log(response);
          console.log("supprimé" + response);
          document.location.href = "/";
        });
    },
  },
};
</script>

<style scoped lang="scss">
.menu {
  padding: 10px;
  color: white;
  display: flex;
  background-color: black;
  justify-content: center;
  justify-content: flex-end;
}

.routerLink {
  text-decoration: none;
  margin-right: 1%;
  color: white;
}
span {
  font-weight: lighter;
}
.login {
  text-align: center;
}
br {
  margin: 20px;
}

button {
  padding: 5px;
  background-color: rgb(59, 91, 161);
  border: none;
  margin: 15px;
  color: white;
}
</style>