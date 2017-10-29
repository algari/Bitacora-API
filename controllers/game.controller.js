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

function getGame(req,res){
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
}

function createGame(req,res){
    
    let game = new Game();
    game.date_in = moment(req.body.date_in).format('LLLL');
    game.quantity = req.body.quantity;
    game.type = req.body.type;
    game.price_in =  req.body.price_in;
    game.time_frame = req.body.time_frame;
    game.price_out = req.body.price_out;
    game.date_out = moment(req.body.date_out).format('LLLL');
    game.commission = req.body.commission;
    game.comments = req.body.comments;
    game.symbol = req.body.symbol;
    game.strategy = req.body.strategy;
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
}

function updateGame(req,res){
    let game_id = req.params.game_id;
    let update = req.body;

    Game.findByIdAndUpdate(game_id,update,(err,gameUpdated)=>{
        if(err){
            return res.status(500).send({message:`Error al actulaizar el juego  ${err}`})
        }else{
            res.status(200).send({gameUpdated:gameUpdated}); 
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
    getGames
}
    
    
    
    