<template>
  <div class="signin">
    <div class="info">
      <router-link to="/" class="routerLink">Connexion</router-link>
      <router-link to="/signin" class="routerLink">S'inscrire</router-link>
    </div>
    <div class="logo">
      <img
        src="../assets/icon-above-font.png"
      />
    </div>
    <div class="singup-dispo">
      <div class="signup-range">
        <p>Nom</p>
        <input type="texte" v-model="nomUser" />
        <p>Prénom</p>
        <input type="texte" v-model="prenomUser" />
        <p>Email</p>
        <input type="texte" v-model="emailUser" />
      </div>
      <div class="signup-range">
        <p>Mot de passe</p>
        <input type="password" v-model="passwordUser" />
        <p>Poste</p>
        <input type="texte" v-model="posteUser" /><br />
        <button v-on:click="checkFormSign">
        <router-link to="/" class="lien">Valider</router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "postSignin",
  data() {
    return {
      nomUser: "",
      prenomUser: "",
      emailUser: "",
      passwordUser: "",
      posteUser: "",
    };
  },
  methods: {
    checkFormSign() {
      axios
        .post("http://localhost:3000/api/user/signup", {
          nom: this.nomUser,
          prenom: this.prenomUser,
          email: this.emailUser,
          password: this.passwordUser,
          poste: this.posteUser,
        })
        .then((response) => {
          console.log(response);
        }).catch(function (error) {
          if (error) {
           alert("Veuillez saisir des données correct");
          }
        });
    },
  },
};
</script>

<style scoped lang="scss">
.info {
  padding: 10px;
  color: white;
  display: flex;
  background-color: #fd2d01;
  justify-content: center;
  justify-content: flex-end;
  margin-bottom: 50px;
  text-align: center;
}

.singup-dispo {
  text-align: center;
  margin-top: 0px;
  display: flex;
  margin: 0 auto;
  width:350px;
  border-radius: 15px;
  box-shadow: 2px 3px 5px rgb(196, 196, 196);
  padding:20px;
  margin-bottom:100px;
}

.routerLink {
  text-decoration: none;
  margin-right: 1%;
  color: white;
}

button {
  padding: 5px;
  background-color: #fd2d01;
  border: none;
  margin: 15px;
}
.lien {
  text-decoration: none;
  color: white;
}
.logo {
  text-align: center;
  margin: 20px;
}
.logo img{
  width:30%;
}
.signup-range{
  
  margin: 0 auto;
}
</style>