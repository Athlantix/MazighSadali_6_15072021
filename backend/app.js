const express=require('express'); 
const app=express();
const bodyParser=require('body-parser');
const usersRoutes = require('./routes/user')
const mysql = require('mysql');

app.use(bodyParser.json());


const port=3000;
app.listen (port, ()=>console.log("notre application node a démarré"));



/*app.get('/publication',(req,res)=>{
  let sql="SELECT * FROM publication";
  con.query(sql,(err,result)=>{
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})
*/

app.use('/user', usersRoutes)

module.exports = app;   