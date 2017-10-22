'use strict'

const express= require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = 3300;
const mongoose = require('mongoose');

const Game = require('./models/game');

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
    Game.find({},(err,games)=>{
        if(err){
            return res.status(500).send({message:`Error al realizar la busqueda de los juegos ${err}`})
        }
        if(!games){
            return res.status(404).send({message:`No existen Juegos!`})
        }else{
            res.status(200).send({games:games});
        }
    })
    
})

app.get('/api/game/:game_id',(req,res)=>{
    let game_id = req.params.game_id;

    Game.findById(game_id,(err,game)=>{
        if(err){
            return res.status(500).send({message:`Error al realizar la busqueda del juego ${err}`})
        }
        if(!game){
            return res.status(404).send({message:`Juego no existe!`})
        }else{
            return res.status(200).send({game:game})
        }
    })
})

app.post('/api/game',(req,res)=>{
    console.log('POST /api/game/');
    console.log(req.body);

    let game = new Game();
    game.date_in = req.body.date_in;
    game.quantity = req.body.quantity;
    game.type = req.body.type;
    game.price_in = req.body.price_in;
    game.time_frame = req.body.time_frame;
    game.price_out = req.body.price_out;
    game.date_out = req.body.date_out;
    game.commission = req.body.commission;
    game.comments = req.body.comments;
    game.symbol = req.body.symbol;
    game.strategie = req.body.strategie;
    game.result = req.body.result;
    game.neto = req.body.neto;
    game.netoCmm = req.body.netoCmm;
    game.save((err,gameStored)=>{
        if(err){
            res.status(500).send({message:`Error al guardar el juego ${err}`});
        }else{
            res.status(200).send({game:gameStored}); 
        }
    })

})

app.put('/api/game/:game_id',(req,res)=>{
    let game_id = req.params.game_id;
    let update = req.body;

    Game.findByIdAndUpdate(game_id,update,(err,gameUpdated)=>{
        if(err){
            return res.status(500).send({message:`Error al actulaizar el juego  ${err}`})
        }else{
            res.status(200).send({gameUpdated:gameUpdated}); 
        }
    })
})

app.delete('/api/game/:game_id',(req,res)=>{
    let game_id = req.params.game_id;

    Game.findById(game_id,(err,game)=>{
        if(err){
            return res.status(500).send({message:`Error al borrar el juego ${err}`})
        }
        game.remove(err=>{
            if(err){
                return res.status(500).send({message:`Error al borrar el juego juego ${err}`})
            }else{
                res.status(200).send({message:`El Juego ha sido eliminado ${game}`}); 
            }
        })
    })
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

