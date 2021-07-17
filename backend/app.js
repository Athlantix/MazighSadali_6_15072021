const express=require('express'); 
const app=express();
const bodyParser=require('body-parser');
const publicationRoutes = require('./routes/publication');
const usersRoutes = require('./routes/user')

const mysql = require('mysql');
const helmet = require("helmet");

app.use(helmet());
app.use(bodyParser.json());


const port=3000;
app.listen (port, ()=>console.log("notre application node a démarré"));



app.use('/api/user', usersRoutes);
app.use('/api/publication',publicationRoutes);

module.exports = app;   