<template>
  <div class="profil-contain">
    <div class="menu">
      <router-link to="/accueil" class="routerLink">Acceuil</router-link>
      <a v-on:click="deleteStorage()">Déconnexion</a>
    </div>
    <div class='profil'>
      <div class="flex-info" >
        <div >
          <b>Nom </b>
          <b>Prénom </b>
          <b>Poste </b>
          <b>Acces </b>
        </div>
      <div class="info-user">
          <span>{{ nomUser }}</span><br />
          <span>{{ prenomUser }}</span>
          <br />  
          <span>{{ posteUser }}</span>
          <br />
          <span>{{ accesUser }}</span> <br/>
      </div>
      </div>
    
      </div>
    <div class="modification">
      <button v-on:click="showInput()">Modifier</button>
      <div class="modif_user" v-if="show === true">
        <p>Nom: <input type="texte" v-model="ModifnomUser" /></p>
        <p>Prénom:<input type="texte" v-model="ModifprenomUser" /></p>
        <p>Poste: <input type="texte" v-model="ModifposteUser" /></p>
        <button v-on:click="modifyUser()">Envoyer</button>
      </div>
      <button v-on:click="deleteUser(idUser)">Supprimer compte</button>
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
  name: "profil",
  data() {
    return {
      show: false,
      nomUser: "",
      prenomUser: "",
      posteUser: "",
      accesUser: "",
      idUser: "",

      ModifnomUser: "",
      ModifprenomUser: "",
      ModifposteUser: "",
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

    //afficher les champs modifications
    showInput() {
      this.show = true;
    },

    //modifier un utilisateur
    modifyUser() {
      axios
        .put("http://localhost:3000/api/user", {
          id: this.idUser,
          nom: this.ModifnomUser,
          prenom: this.ModifprenomUser,
          poste: this.ModifposteUser,
        })
        .then((response) => {
          console.log(response);
          console.log("supprimé" + response);
          this.$router.go();
        });
    },

    //suppression localStorage et redirection à la page d'accueil
    deleteStorage() {
      localStorage.clear();
      this.idUser = null;
      document.location.href = "/";
    },
  //supprimer un utilisateur
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
  background-color: #fd2d01;
  justify-content: center;
  justify-content: flex-end;
}

.routerLink {
  text-decoration: none;
  margin-right: 1%;
  color: white;
}
span {
  
  font-weight: bold;
  display: block;
  margin-top:4px;
  margin-left:20px;
}
.profil-contain {

}
br {
  margin: 5px;
}

b{
  border:2px solid #fd2d01 ;
  padding:5px;
  border-radius:5px ;
  color:#fd2d01;
  margin-top:20px;
  display: block;;
}

button {
  padding: 5px;
  background-color: white;
  border: 1px solid #fd2d01;
  color: #fd2d01;
  margin:10px;
}
.profil{
  
  border-radius: 15px;
  box-shadow: 2px 3px 5px rgb(196, 196, 196);
  width:50%;
  margin: 0 auto;
  margin-top:50px;
  padding:20px;
}
.flex-info{
  display:flex;
  justify-content: center;
}

.info-user{
  margin-top:30px;
}
.modification{
  width:20%;
  margin:0 auto;
}

</style>