const mysql = require('mysql');
const con=require("../config_db/db_connect");  
const bcrypt = require('bcrypt');

exports.AllUsers=(req,res,next)=>{
    let sql="SELECT * FROM user";
    con.query(sql,(err,result)=>{
      if(err) throw err;
      console.log(result);
      res.send(result);
    })
  }
  
exports.OneUser=(req,res,next)=>{
    let sql="SELECT * FROM user WHERE id=?";
    let insert=[req.params.id];
    con.query(sql,insert,(err,result)=>{
      if(err) throw err;
      console.log(result);
      res.send(result);
    })
  }
  
exports.AllPublication=(req,res,next)=>{
    let sql="SELECT * FROM publication";
    con.query(sql,(err,result)=>{
      if(err) throw err;
      console.log(result);
      res.send(result);
    })
  }
  
exports.signup=(req,res,next)=>{
    console.log(req.body);
    let psdCrypt=req.body.password;
    bcrypt.hash(psdCrypt, 10, function(err,psdCrypt) {
      console.log(psdCrypt)
      let sql= "INSERT INTO user VALUES (NULL,?,?,?,?,?,2)";
      let insert=[req.body.nom, req.body.prenom, req.body.email, psdCrypt, req.body.poste];
      
      con.query(sql,insert,(err,result)=>{
        if(err) throw res.status(400).json({ message: 'Utilisateur existant' });
        res.status(200).json({ message: 'Utilisateur ajouté' });
      })
      // Store hash in your password DB.
  });

  }
  
  
exports.login=(req,res,next)=>{
    //console.log(req.body.email);


      // result == true
 

    let sql= "SELECT email,id,password from user where email = ?";
    let insert=[req.body.email];
    
    con.query(sql,insert,(err,result)=>{
      
      if(err)  res.status(400).json({ message: 'faux'});
     
      if(result[0]==undefined){ res.status(400).json({ message: 'Aucun utilisateurs confirmé' }); }
      bcrypt.compare(req.body.password, result[0].password, function(err, result) {
      if(result){res.status(200).json({ message: 'Utilisateur confirmé'})}
      else { res.status(400).json({ message: 'Aucuns utilisateurs ne correspond'})}
      });
    })
 
  }