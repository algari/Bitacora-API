'use strict'

const express = require('express')
const gameCtrl = require('../controllers/game.controller')
const strategyCtrl = require('../controllers/strategy.controller')
const sourceCtrl = require('../controllers/source.controller')
const tagCtrl = require('../controllers/tag.controller')
const userCtrl = require('../controllers/auth.controller')
const analysisCtrl = require('../controllers/analysis.controller')
const auth = require('../middelwares/auth.mid')
const api = express.Router();

//Games
api.get('/game',auth, gameCtrl.getGames);
api.get('/gamebyusername',auth, gameCtrl.getGamesByUsername);
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

//Source
api.get('/sources',auth, sourceCtrl.getSources);
api.get('/source/:source_id',auth ,sourceCtrl.getSource)
api.get('/sourcebyusername/:username',auth ,sourceCtrl.getSourceByUsername)
api.post('/source',auth,sourceCtrl.createSource)
api.put('/source/:source_id',auth,sourceCtrl.updateSource)
api.delete('/source/:source_id',auth,sourceCtrl.deleteSource)

//Tags
api.get('/tags',auth, tagCtrl.getTags);
api.get('/tag/:tag_id',auth ,tagCtrl.getTag)
api.get('/tagbyusername/:username',auth ,tagCtrl.getTagByUsername)
api.post('/tag',auth,tagCtrl.createTag)
api.put('/tag/:tag_id',auth,tagCtrl.updateTag)
api.delete('/tag/:tag_id',auth,tagCtrl.deleteTag)


//Analysis
api.get('/analysis/strategies',auth,analysisCtrl.strategiesAnalysis)

//User
api.post('/singup',auth,userCtrl.singUp)
api.post('/users/login',userCtrl.singIn)
api.put('/users/:user_id',auth ,userCtrl.updateUser)

api.get('/private', auth,(req,res)=>{
    res.status(200).send({message:'Tiene acceso'})
});

module.exports = api