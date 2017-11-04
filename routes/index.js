'use strict'

const express = require('express')
const gameCtrl = require('../controllers/game.controller')
const strategyCtrl = require('../controllers/strategy.controller')
const userCtrl = require('../controllers/auth.controller')
const analysisCtrl = require('../controllers/analysis.controller')
const auth = require('../middelwares/auth.mid')
const api = express.Router();

//Games
api.get('/game',auth, gameCtrl.getGames);
api.get('/gamebyusername/:username',auth, gameCtrl.getGamesByUsername);
api.get('/gamebydates',auth,gameCtrl.getGamesByDates)
api.get('/game/:game_id',auth ,gameCtrl.getGame)
api.post('/game',auth,gameCtrl.createGame)
api.put('/game/:game_id',auth,gameCtrl.updateGame)
api.delete('/game/:game_id',auth,gameCtrl.deleteGame)

//Strategies
api.get('/strategies',auth, strategyCtrl.getStrategies);
api.get('/strategy/:strategy_id',auth ,strategyCtrl.getStrategy)
api.get('/strategybyusername/:username',auth ,strategyCtrl.getStrategyByUsername)
api.post('/strategy',auth,strategyCtrl.createStrategy)
api.put('/strategy/:strategy_id',auth,strategyCtrl.updateStrategy)
api.delete('/strategy/:strategy_id',auth,strategyCtrl.deleteStrategy)


//Analysis
api.get('/analysis/strategies',auth,analysisCtrl.strategiesAnalysis)

//User
api.post('/singup',auth,userCtrl.singUp)
api.post('/users/login',userCtrl.singIn)

api.get('/private', auth,(req,res)=>{
    res.status(200).send({message:'Tiene acceso'})
});

module.exports = api