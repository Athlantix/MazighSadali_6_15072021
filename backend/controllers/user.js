
const con=require("../config_db/db_connect");  

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
    let sql= "INSERT INTO user VALUES (NULL,?,?,?,?,?,2)";
    let insert=[req.body.nom, req.body.prenom, req.body.email, req.body.password, req.body.poste];
    
    con.query(sql,insert,(err,result)=>{
      if(err) throw res.status(400).json({ message: 'Utilisateur existant' });
      res.status(200).json({ message: 'Utilisateur ajouté' });
    })
  }
  
  
exports.login=(req,res,next)=>{
    //console.log(req.body.email);
    let sql= "SELECT email from user where email = ? ";
    let insert=[req.body.email];
    
    con.query(sql,insert,(err,result)=>{
      if(err) throw err;
      if(result[0]==undefined){ res.status(400).json({ message: 'Aucun utilisateurs confirmé' }); }
      else{res.status(200).json({ message: 'Utilisateur confirmé' });}
    })
  }