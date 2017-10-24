'use strict'

const app = require('./app')
const mongoose = require('mongoose');
const conf = require('./config')

const server = require('http').createServer(app);

mongoose.connect(conf.db,(err,res)=>{
    if(err) {
        console.log(`Error al conectar a la base de datos :( ${err}`)
    }else{
        console.log('Conexion a la base de datos estrablecida :)');
    }
    server.listen(conf.port,()=>{
        console.log('API RESTfull corriendo en http://localhost:',conf.port);
    })
});

