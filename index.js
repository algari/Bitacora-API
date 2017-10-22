'use strict'

const express= require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = 3300;
const mongoose = require('mongoose');

const server = require('http').createServer(app);

//Inicio Midelwares para Nodejs
const bodyParser = require('body-parser');

//hace monitoreo de las APIS
app.use(morgan('dev'));

//body parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//Fin Midelwares para Nodejs

app.get('/api/game',(req,res)=>{
    res.status(200).send({games:[]});
})

app.get('/api/game/:id',(req,res)=>{

})

app.post('/api/game',(req,res)=>{
    console.log(req.body);
    res.status(200).send({message:`El juego se ha recibido!!`})
})

app.put('/api/game/{id}',(req,res)=>{

})

app.delete('/api/game/{id}',(req,res)=>{

})

mongoose.connect('mongodb://localhost:27017/Bitacora',(err,res)=>{
    if(err) {
        console.log(`Error al conectar a la base de datos :( ${err}`)
    }else{
        console.log('Conexion a la base de datos estrablecida :)');
    }
    server.listen(port,()=>{
        console.log('API RESTfull corriendo en http://localhost:',port);
    })
});

