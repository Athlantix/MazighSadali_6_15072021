const express=require('express');
const mysql = require('mysql'); 
const app=express();


const port=3000;
app.listen (port, ()=>console.log("notre application node a démarré"));

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "athlantix",
  database:'utilisateurs'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/user',(req,res)=>{
  let sql="SELECT * FROM user";
  con.query(sql,(err,result)=>{
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

app.get('/user/:id', (req,res)=>{
  let sql="SELECT * FROM user WHERE id=?";
  let insert=[req.params.id];
  con.query(sql,insert,(err,result)=>{
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})


app.get('/publication',(req,res)=>{
  let sql="SELECT * FROM publication";
  con.query(sql,(err,result)=>{
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})
