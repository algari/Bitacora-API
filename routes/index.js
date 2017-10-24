'use strict'

const express = require('express')
const gameCtrl = require('../controllers/game.controller')
const userCtrl = require('../controllers/auth.controller')
const auth = require('../middelwares/auth.mid')
const api = express.Router();

api.get('/game',auth, gameCtrl.getGames);
api.get('/game/:game_id',auth ,gameCtrl.getGame)
api.post('/game',auth,gameCtrl.createGame)
api.put('/game/:game_id',auth,gameCtrl.updateGame)
api.delete('/game/:game_id',auth,gameCtrl.deleteGame)
api.post('/singup',auth,userCtrl.singUp)
api.post('/users/login',userCtrl.singIn)
api.get('/private', auth,(req,res)=>{
    res.status(200).send({message:'Tiene acceso'})
});

module.exports = api