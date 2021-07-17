const fs = require('fs');
const con=require("../config_db/db_connect"); 

exports.AllPublication=(req,res,next)=>{
    let sql="SELECT * FROM publication";
    con.query(sql,(err,result)=>{
      if(err) throw err;
      console.log(result);
      res.send(result);
    })
  }
  