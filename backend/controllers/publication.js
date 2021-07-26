const fs = require('fs');
const con=require("../config_db/db_connect"); 
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.CreatePublication=(req,res,next)=>{
  const sql= "INSERT INTO publication VALUES(NULL,?,NOW(),?,?);";
  let image='';
  if(req.file===undefined){
    image='';
  }
  else { 
    console.log("OH OUIIII")
    image= `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  }
    console.log("haaaaaa IMGG: "+ image)
  const insert=[ req.body.id, req.body.message, image ];
  console.log("voila : "+ req.files)
  con.query(sql,insert,(err,result)=>{
    if(err) {res.status(400).json({ message: 'Il y a une erreur dans le poste' })}
    else{  res.status(200).json({ message: 'Poste ajouté' });}
  })
}
exports.AllPublication=(req,res,next)=>{
    const sql=
    " SELECT DISTINCT publication.id,user_id,date,texte,image,nom,prenom,poste FROM publication INNER JOIN user ON publication.user_id=user.id ORDER BY publication.id DESC;";
    con.query(sql,(err,result)=>{
      if(err) {res.status(400).json({ message: 'Nous ne parvenons pas à récupérer les publications ' })}
      else{  res.status(200).json( result)}
    })
  }


  exports.OnePublication=(req,res,next)=>{

    const sql=
    " SELECT DISTINCT publication.id,user_id,date,texte,image,nom,prenom,poste FROM publication INNER JOIN user ON publication.user_id=user.id WHERE publication.id=? ORDER BY publication.id DESC;";
    const insert=[req.params.id];
    

    const sqlCom=
    "SELECT DISTINCT commentaire.id,user_id,id_publication,dateCommentaire,message,user.nom,user.prenom FROM commentaire INNER JOIN user ON commentaire.user_id=user.id WHERE commentaire.id_publication=? ORDER BY commentaire.id DESC;"
    con.query(sql,insert,(err,result)=>{
      if(err) {res.status(400).json({ message: 'Nous ne parvenons pas à récupérer la publications' })}
      else{ 
        const publication=result;
        con.query(sqlCom,insert,(err,result)=>{
          if(err) {res.status(400).json({ message: 'Nous ne parvenons pas à récupérer la publications' })}
          else{  res.status(200).json( 
            {publication:publication,
             commentaire:result} );}
        })
      }
    })
  }

  exports.ModifyPublication=(req,res,next)=>{
   
let image='';
if(req.file===undefined){
  image='';
}
else { 
  console.log("OH OUIIII")
  image= `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

}

const sql=
"UPDATE publication SET texte= ? , image = ? WHERE id= ?  ;";

const insert=[req.body.texte, image,req.body.id]

    con.query(sql,insert,(err,result)=>{
      if(err) {res.status(400).json({ message: 'Nous ne parvenons pas à modifier la publication ' })}
      else{  res.status(200).json( result)}
    })
  }


  exports.DeletePublication=(req,res,next)=>{

     const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token,process.env.JWT_SECRET); 
    console.log(decodedToken.acces);
   

    const sql=" DELETE FROM publication WHERE id=?;";
 
    const insert=[req.params.id];
    if(decodedToken.acces===1){
      con.query(sql,insert,(err,result)=>{
        if(err) {res.status(400).json({ err })}
        else{  res.status(200).json( {message:'Nous avons supprimé la publication'});
        const filename = result.image.split('/images/')[1];
        fs.unlink(`images/${filename}`,(err => {
          if (err) console.log(err);}
          ))
      }
      })
    }
    else{

      con.query(sql,insert,(err,result)=>{
        if(err) {res.status(400).json({ err })}
        else{  res.status(200).json( {message:'Nous avons supprimé la publication'})}
      })
    }
    
  }


  exports.PostCommentaire=(req,res,next)=>{
    const sql="insert into commentaire values (null,?,?,NOW(),?);";
    const insert=[req.body.id_user,req.body.id_publication,req.body.message];
    con.query(sql,insert,(err,result)=>{
      if(err) {res.status(400).json({ message: 'Nous ne parvenons pas à ajouter votre commentaires' })}
      else{  res.status(200).json({message:'Commentaire ajouté'} )}
    })
  }

  exports.DeleteCommentaire=(req,res,next)=>{

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token,process.env.JWT_SECRET); 
    console.log(decodedToken.acces);
   
    const sql=" delete from commentaire where id=?;";
    const insert=[req.params.id];

    if (decodedToken.acces===1){
        con.query(sql,insert,(err,result)=>{
        if(err) {res.status(400).json({ message: 'Nous ne parvenons pas à supprimer votre commentaires' })}
        else{  res.status(200).json({message:'Commentaire supprimé'} )}
      })
    }
    else{
      con.query(sql,insert,(err,result)=>{
        if(err) {res.status(400).json({ message: 'Nous ne parvenons pas à supprimer votre commentaires' })}
        else{  res.status(200).json({message:'Commentaire supprimé'} )}
      })
    }
   
  }