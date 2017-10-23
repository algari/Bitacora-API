'use strict'

const express = require('express')
const gameCtrl = require('../controllers/game.controller')
const api = express.Router();

api.get('/game',gameCtrl.getGames);
api.get('/game/:game_id',gameCtrl.getGame)
api.post('/game',gameCtrl.createGame)
api.put('/game/:game_id',gameCtrl.updateGame)
api.delete('/game/:game_id',gameCtrl.deleteGame)

module.exports = api