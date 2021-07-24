const express=require('express'); 
const app=express();
const bodyParser=require('body-parser');
const publicationRoutes = require('./routes/publication');
const usersRoutes = require('./routes/user');
const path = require('path');
const mysql = require('mysql');
const helmet = require("helmet");
require('dotenv').config();   


app.use(bodyParser.urlencoded({ extended: true }));



app.use(helmet());
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

const port=3000;
app.listen (port, ()=>console.log("notre application node a démarré"));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


app.use('/api/user', usersRoutes);
app.use('/api/publication',publicationRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));
module.exports = app;   