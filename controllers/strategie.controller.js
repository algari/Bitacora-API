'use strict'

const Strategie = require('../models/strategie');

function getStrategies(req,res){
    Strategie.find({},(err,strategies)=>{
        if(err){
            return res.status(500).send({message:`Error al realizar la busqueda de las estrategias ${err}`})
        }
        if(!strategies){
            return res.status(404).send({message:`No existen Estrategias!`})
        }else{
            res.status(200).send(strategies);
        }
    })
}

function getStrategie(req,res){
    let strategie_id = req.params.strategie_id;
    
    Strategie.findById(strategie_id,(err,strategie)=>{
        if(err){
            return res.status(500).send({message:`Error al realizar la busqueda de la estrategia ${err}`})
        }
        if(!strategie){
            return res.status(404).send({message:`Estrategia no existe!`})
        }else{
            return res.status(200).send({strategie:strategie})
        }
    })
}

function createStrategie(req,res){
    console.log('POST /api/strategie/');
    console.log(req.body);

    let strategie = new Strategie();
    strategie.strategie = req.body.strategie;
    strategie.save((err,strategiestored)=>{
        if(err){
            res.status(500).send({message:`Error al guardar la estrategia ${err}`});
        }else{
            res.status(200).send({strategie:strategiestored}); 
        }
    })
}

function updateStrategie(req,res){
    let strategie_id = req.params.strategie_id;
    let update = req.body;

    Strategie.findByIdAndUpdate(strategie_id,update,(err,strategieUpdated)=>{
        if(err){
            return res.status(500).send({message:`Error al actulaizar la estrategia  ${err}`})
        }else{
            res.status(200).send({strategieUpdated:strategieUpdated}); 
        }
    })
}

function deleteStrategie(req,res){
    let strategie_id = req.params.strategie_id;
    
    Strategie.findById(strategie_id,(err,strategie)=>{
        if(!err){
            return res.status(500).send({message:`Error al borrar el juego ${err}`})
        }
        strategie.remove(err=>{
            if(err){
                return res.status(500).send({message:`Error al borrar el juego juego ${err}`})
            }else{
                res.status(200).send({message:`El Juego ha sido eliminado ${strategie}`}); 
            }
        })
    })
}

module.exports = {
    deleteStrategie,
    updateStrategie,
    createStrategie,
    getStrategie,
    getStrategies
}   