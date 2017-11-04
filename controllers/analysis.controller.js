'use strict'

const Strategy = require('../models/strategy');
const Game = require('../models/game');
const conf = require('../config')
const moment = require('moment');

function strategiesAnalysis(req,res){
    let date_in = moment(req.query.date_in).format('L') +' 12:00:00 AM';
    let date_out = moment(req.query.date_out).format('L') +' 11:59:00 PM'; 
    console.log(date_in+" "+date_out)
    Strategy.find({},(err,strategy)=>{
        if(err){
            return res.status(500).send({message:`Error al realizar la busqueda de las estrategias ${err}`})
        }
        if(!strategy){
            return res.status(404).send({message:`No existen Estrategias!`})
        }else{
            Game.find({ $and: [{date_in:{$gte: date_in},date_out:{$lte:date_out}}]},(err,games)=>{
                if(err){
                    return res.status(500).send({message:`Error al realizar la busqueda de los juegos ${err}`})
                }
                if(!games){
                    return res.status(404).send({message:`No existen Juegos!`})
                }else{
                    const datasets = []
                    const labels = []
                    const valuesP = []
                    const valuesN = []
                    const valuesB = []
                    
                    strategy.forEach(function(str) {
                        var contP = 0;
                        var contN = 0;
                        var contB = 0;
                        games.forEach(function(game){
                            if(game.strategy==str.strategy){
                                if(game.result==conf.RESULT_GAME_BREAK_EVEN){
                                    contB ++;
                                }else if(game.result==conf.RESULT_GAME_POSITIVE){
                                    contP ++;
                                }
                                else if(game.result==conf.RESULT_GAME_NEGATIVE){
                                    contN ++;
                                }
                            } 
                        })
                        valuesB.push(contB)
                        valuesP.push(contP)
                        valuesN.push(contN)
                       
                        labels.push(str.strategy)
                    }, this);
                    
                    var dataP = {
                        label:conf.RESULT_GAME_POSITIVE,
                        backgroundColor: '#9CCC65',
                        borderColor: '#7CB342',
                        data:valuesP
                    }
                    var dataN = {
                        label:conf.RESULT_GAME_NEGATIVE,
                        backgroundColor: '#f53d51',
                        borderColor: '#e5101a',
                        data:valuesN
                    }
                    var dataB = {
                        label:conf.RESULT_GAME_BREAK_EVEN,
                        backgroundColor: '#42A5F5',
                        borderColor: '#1E88E5',
                        data:valuesB
                    }
                    datasets.push(dataB)
                    datasets.push(dataP)
                    datasets.push(dataN)
                    res.status(200).send({labels,datasets});
                }
            })
        }
    })
}

module.exports = {
    strategiesAnalysis,
}   