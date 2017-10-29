'use strict'

const Strategy = require('../models/strategy');

function getStrategies(req,res){
    Strategy.find({},(err,strategy)=>{
        if(err){
            return res.status(500).send({message:`Error al realizar la busqueda de las estrategias ${err}`})
        }
        if(!strategy){
            return res.status(404).send({message:`No existen Estrategias!`})
        }else{
            res.status(200).send(strategy);
        }
    })
}

function getStrategy(req,res){
    let strategy_id = req.params.strategy_id;
    
    Strategy.findById(strategy_id,(err,strategy)=>{
        if(err){
            return res.status(500).send({message:`Error al realizar la busqueda de la estrategia ${err}`})
        }
        if(!strategy){
            return res.status(404).send({message:`Estrategia no existe!`})
        }else{
            return res.status(200).send({strategy:strategy})
        }
    })
}

function createStrategy(req,res){
    let strategy = new Strategy();
    strategy.strategy = req.body.strategy;
    strategy.description = req.body.description;

    strategy.save((err,strategystored)=>{
        if(err){
            res.status(500).send({message:`Error al guardar la estrategia ${err}`});
        }else{
            res.status(200).send({strategy:strategystored}); 
        }
    })
}

function updateStrategy(req,res){
    let strategy_id = req.params.strategy_id;
    let update = req.body;

    Strategy.findByIdAndUpdate(strategy_id,update,(err,strategyUpdated)=>{
        if(err){
            return res.status(500).send({message:`Error al actulaizar la estrategia  ${err}`})
        }else{
            res.status(200).send({strategyUpdated:strategyUpdated}); 
        }
    })
}

function deleteStrategy(req,res){
    let strategy_id = req.params.strategy_id;
    Strategy.findById(strategy_id,(err,strategy)=>{
        if(err){
            return res.status(500).send({message:`Error al borrar el juego ${err}`})
        }
        strategy.remove(err=>{
            if(err){
                return res.status(500).send({message:`Error al borrar el juego juego ${err}`})
            }else{
                res.status(200).send({message:`El Juego ha sido eliminado ${strategy}`}); 
            }
        })
    })
}

// function strategiesAnalysis(req,res){
//     let date_in = req.query.date_in;
//     let date_out = req.query.date_out;

//     Strategy.find({},(err,strategy)=>{
//         if(err){
//             return res.status(500).send({message:`Error al realizar la busqueda de las estrategias ${err}`})
//         }
//         if(!strategy){
//             return res.status(404).send({message:`No existen Estrategias!`})
//         }else{
//             res.status(200).send(strategy);
//         }
//     })
// }

module.exports = {
    deleteStrategy,
    updateStrategy,
    createStrategy,
    getStrategy,
    getStrategies,
}   