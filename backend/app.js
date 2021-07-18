const express=require('express'); 
const app=express();
const bodyParser=require('body-parser');
const publicationRoutes = require('./routes/publication');
const usersRoutes = require('./routes/user');
const path = require('path');

const mysql = require('mysql');
const helmet = require("helmet");

app.use(helmet());
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

const port=3000;
app.listen (port, ()=>console.log("notre application node a démarré"));



app.use('/api/user', usersRoutes);
app.use('/api/publication',publicationRoutes);

module.exports = app;   