<template>
  <div>
    <div class="info">
      <router-link to="/" class="routerLink">Connexion</router-link>
      <router-link to="/signin" class="routerLink">S'inscrire</router-link>
    </div>
    <div class="logo">
      <img
        src="../assets/icon-above-font.png"
      />
    </div>
    <div class="login-dispo">
      <p>Email</p>
      <input type="texte" v-model="email" />
      <p>Mot de passe</p>
      <input type="password" v-model="password" /><br />
      <button v-on:click="checkForm">Valider</button>
      <b>{{ erreur }}</b>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "postLogin",
  data() {
    return {
      email: "",
      password: "",
      erreur: "",
    };
  },

  methods: {
    checkForm() {
      axios
        .post("http://localhost:3000/api/user/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          localStorage.clear();
          localStorage.setItem("token", response.data.token);
          axios
            .get("http://localhost:3000/api/user/currentUser/get")
            .then((response) => {
              console.log(response);
            });
          this.$router.push({ path: "/accueil" });
        })
        .catch(function (error) {
          if (error) {
           alert("Nous ne parvenons pas à trouver cet utilisateur");
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
}
.login-dispo {
  margin-top:0px;
  text-align: center;
  border-radius: 15px;
  box-shadow: 2px 3px 5px rgb(196, 196, 196);
  width:50%;
  margin: 0 auto;
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
  color: white;
}
.logo {
  text-align: center;
  
}
.logo img{
  width:30%;
}
</style>