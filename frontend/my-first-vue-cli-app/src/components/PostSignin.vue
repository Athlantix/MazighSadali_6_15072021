<template>
  <div class="signin">
    <div class="info">
      <router-link to="/" class="routerLink">Connexion</router-link>
      <router-link to="/signin" class="routerLink">S'inscrire</router-link>
    </div>
    <div class="logo">
      <img
        src="https://user.oc-static.com/upload/2019/09/04/15676009353158_image2.png"
      />
    </div>
    <div class="singup-dispo">
      <p>Nom</p>
      <input type="texte" v-model="nomUser" />
      <p>Prénom</p>
      <input type="texte" v-model="prenomUser" />
      <p>Email</p>
      <input type="texte" v-model="emailUser" />
      <p>Mot de passe</p>
      <input type="password" v-model="passwordUser" />
      <p>Poste</p>
      <input type="texte" v-model="posteUser" /><br />
      <button v-on:click="checkFormSign">
        <router-link to="/" class="lien">Valider</router-link>
      </button>
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
  background-color: black;
  justify-content: center;
  justify-content: flex-end;
  margin-bottom: 50px;
  text-align: center;
}

.singup-dispo {
  text-align: center;
}

.routerLink {
  text-decoration: none;
  margin-right: 1%;
  color: white;
}

button {
  padding: 5px;
  background-color: rgb(59, 91, 161);
  border: none;
  margin: 15px;
}
.lien {
  text-decoration: none;
  color: white;
}
.logo {
  text-align: center;
  margin: 40px;
}
.logo img{
  width:40%;
}
</style>