const fs = require('fs');
const con=require("../config_db/db_connect"); 


exports.CreatePublication=(req,res,next)=>{
  let sql= "INSERT INTO publication VALUES(NULL,?,NOW(),?,?);";
  let insert=[req.body.id,req.body.message, req.body.image];
  con.query(sql,insert,(err,result)=>{
    if(err) {res.status(400).json({ message: 'Il y a une erreur dans le poste' })}
    else{  res.status(200).json({ message: 'Poste ajouté' });}
  })
}
exports.AllPublication=(req,res,next)=>{
    let sql="SELECT * FROM publication;";
    con.query(sql,(err,result)=>{
      if(err) {res.status(400).json({ message: 'Nous ne parvenons pas à récupérer les publications ' })}
      else{  res.status(200).json( result)}
    })
  }


  exports.OnePublication=(req,res,next)=>{
    let sql=" SELECT * FROM publication WHERE publication.id=?;";
    let insert=[req.params.id];
    con.query(sql,insert,(err,result)=>{
      if(err) {res.status(400).json({ message: 'Nous ne parvenons pas à récupérer la publications' })}
      else{  res.status(200).json( result );}
    })
  }


  exports.DeletePublication=(req,res,next)=>{
    let sql=" DELETE publication,commentaire FROM publication INNER JOIN commentaire ON publication.id = commentaire.id_publication where publication.id=?;";
    let insert=[req.params.id];
    con.query(sql,insert,(err,result)=>{
      if(err) {res.status(400).json({ err })}
      else{  res.status(200).json( {message:'Nous avons supprimé la publication'})}
    })
  }
  exports.AllCommentaire=(req,res,next)=>{
    let sql="SELECT * FROM commentaire";
    con.query(sql,(err,result)=>{
      if(err) {res.status(400).json({ message: 'Nous ne parvenons pas à récupérer les commentaires' })}
      else{  res.status(200).json(result )}
    })
  }