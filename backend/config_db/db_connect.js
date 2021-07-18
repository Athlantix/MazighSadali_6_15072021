const mysql = require('mysql');
require('dotenv').config();  

let con = mysql.createConnection({
    host: process.env.BDD_HOST,
    user:process.env.BDD_USER,
    password: process.env.BDD_PASSWORD,
    database:'utilisateurs'
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  module.exports = con;