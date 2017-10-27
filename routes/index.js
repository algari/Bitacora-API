'use strict'

const express = require('express')
const gameCtrl = require('../controllers/game.controller')
const strategieCtrl = require('../controllers/strategie.controller')
const userCtrl = require('../controllers/auth.controller')
const auth = require('../middelwares/auth.mid')
const api = express.Router();

//Games
api.get('/game',auth, gameCtrl.getGames);
api.get('/game/:game_id',auth ,gameCtrl.getGame)
api.post('/game',auth,gameCtrl.createGame)
api.put('/game/:game_id',auth,gameCtrl.updateGame)
api.delete('/game/:game_id',auth,gameCtrl.deleteGame)

//Strategies
api.get('/strategie',auth, strategieCtrl.getStrategies);
api.get('/strategie/:strategie_id',auth ,strategieCtrl.getStrategie)
api.post('/strategie',auth,strategieCtrl.createStrategie)
api.put('/strategie/:strategie_id',auth,strategieCtrl.updateStrategie)
api.delete('/strategie/:strategie_id',auth,strategieCtrl.deleteStrategie)

//User
api.post('/singup',auth,userCtrl.singUp)
api.post('/users/login',userCtrl.singIn)

api.get('/private', auth,(req,res)=>{
    res.status(200).send({message:'Tiene acceso'})
});

module.exports = api