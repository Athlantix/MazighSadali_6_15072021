<template>
<div>

<div class="publication" v-for="post in post" :key="post[i]" >
  <h2>{{post.user_id}}</h2>
  <p>{{post.texte}}</p>
  <p>{{post.date}}</p>
</div>
</div>

</template>

<script>
const axios = require('axios');
const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjM0LCJhY2NlcyI6MiwiaWF0IjoxNjI2ODAyNzA5LCJleHAiOjE2MjY4ODkxMDl9.bC0Mw8KTOv2_RffcfmZt_pyB9xhUs3VGzL2GrsZl4M4'
axios.interceptors.request.use(
  config=>{
    config.headers.authorization=`Bearer ${token}`;
    return config
  },
  error => {return Promise.reject(error)}
)

export default {
  name: 'publicationUser',
  methods:{

  },
  data(){
    return {
      post:[]
      }
  },
  created(){
    axios
      .get("http://localhost:3000/api/publication")
      .then(response=>{
        for(let i=0;i<response.data.length;i++){
        this.post.push(response.data[i]);console.log(console.log(response.data[i]))
        }
       
      }).catch(); 
  }
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
