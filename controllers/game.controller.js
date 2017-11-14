'use strict'

const Game = require('../models/game');
const moment = require('moment');

function getGames(req,res){
    Game.find({},(err,games)=>{
        if(err){
            return res.status(500).send({message:`Error al realizar la busqueda de los juegos ${err}`})
        }
        if(!games){
            return res.status(404).send({message:`No existen Juegos!`})
        }else{
            res.status(200).send(games);
        }
    })
}

function getGamesByUsername(req,res){
    let username = req.params.username;
    Game.find({username:username},(err,games)=>{
        if(err){
            return res.status(500).send({message:`Error al realizar la busqueda de los juegos ${err}`})
        }
        if(!games){
            return res.status(404).send({message:`No existen Juegos!`})
        }else{
            res.status(200).send(games);
        }
    })
}

function getGamesByDates(req,res){
    let date_in = moment(req.query.date_in).format('L') +' 12:00:00 AM';
    let date_out = moment(req.query.date_out).format('L') +' 11:59:00 PM';
    let username = req.query.username;  
    console.log(date_in+" "+date_out);
    Game.find({ $and: [{
        username:username,
        date_in:{$gte: date_in},
        date_out:{$lte:date_out},
        }]
        },(err,games)=>{
        if(err){
            return res.status(500).send({message:`Error al realizar la busqueda de los juegos ${err}`})
        }
        if(!games){
            return res.status(404).send({message:`No existen Juegos!`})
        }else{
            res.status(200).send(games);
        }
    })
}

function getGame(req,res){
    let game_id = req.params.game_id;
    
    Game.findById(game_id,(err,game)=>{
        if(err){
            return res.status(500).send({message:`Error al realizar la busqueda del juego ${err}`})
        }
        if(!game){
            return res.status(404).send({message:`Juego no existe!`})
        }else{
            return res.status(200).send(game)
        }
    })
}

function createGame(req,res){
    
    let game = new Game();
    game.username = req.body.username;
    game.symbol = req.body.symbol;
    game.type = req.body.type;
    game.time_frame = req.body.time_frame;
    game.strategy = req.body.strategy;
    game.source = req.body.source;
    game.commission = req.body.commission;
    game.comments = req.body.comments;
    game.result = req.body.result;
    game.neto = req.body.neto;
    game.netoCmm = req.body.netoCmm;
    game.r = req.body.r;
    game.netoR = req.body.netoR;
    game.percentCaptured = req.body.percentCaptured;
    game.followed = req.body.followed;
    game.chart = req.body.chart;
    game.maxMove = req.body.maxMove;
    game.tags = req.body.tags;
    game.entries = req.body.entries;
    game.exits = req.body.exits;
    game.status = req.body.status;

    game.save((err,gameStored)=>{
        if(err){
            res.status(500).send({message:`Error al guardar el juego ${err}`});
        }else{
            res.status(200).send(gameStored); 
        }
    })
}

function updateGame(req,res){
    let game_id = req.params.game_id;
    let update = req.body;

    Game.findByIdAndUpdate(game_id,update,(err,gameUpdated)=>{
        if(err){
            return res.status(500).send({message:`Error al actulaizar el juego  ${err}`})
        }else{
            res.status(200).send(gameUpdated); 
        }
    })
}

function deleteGame(req,res){
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
}

module.exports = {
    deleteGame,
    updateGame,
    createGame,
    getGame,
    getGames,
    getGamesByDates,
    getGamesByUsername
}
    
    
    
    