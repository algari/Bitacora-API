'use strict'

const Source = require('../models/source');

function getSources(req,res){
    Source.find({},(err,source)=>{
        if(err){
            return res.status(500).send({message:`Error al realizar la busqueda de las fuentes ${err}`})
        }
        if(!source){
            return res.status(404).send({message:`No existen Fuentes!`})
        }else{
            res.status(200).send(source);
        }
    })
}

function getSource(req,res){
    let source_id = req.params.source_id;
    
    Source.findById(source_id,(err,source)=>{
        if(err){
            return res.status(500).send({message:`Error al realizar la busqueda de la fuente ${err}`})
        }
        if(!source){
            return res.status(404).send({message:`Fuente no existe!`})
        }else{
            return res.status(200).send(source)
        }
    })
}

function createSource(req,res){
    let source = new Source();
    source.source = req.body.source;
    source.username = req.body.username;

    source.save((err,sourcestored)=>{
        if(err){
            res.status(500).send({message:`Error al guardar la fuente ${err}`});
        }else{
            res.status(200).send(sourcestored); 
        }
    })
}

function updateSource(req,res){
    let source_id = req.params.source_id;
    let update = req.body;

    Source.findByIdAndUpdate(source_id,update,(err,sourceUpdated)=>{
        if(err){
            return res.status(500).send({message:`Error al actulaizar la fuente  ${err}`})
        }else{
            res.status(200).send(sourceUpdated); 
        }
    })
}

function deleteSource(req,res){
    let source_id = req.params.source_id;
    Source.findById(source_id,(err,source)=>{
        if(err){
            return res.status(500).send({message:`Error al borrar la fuente ${err}`})
        }
        source.remove(err=>{
            if(err){
                return res.status(500).send({message:`Error al borrar la fuente ${err}`})
            }else{
                res.status(200).send({message:`La fuente se ha sido eliminado ${source}`}); 
            }
        })
    })
}

function getSourceByUsername(req,res){
    let username = req.params.username;
    Source.find({username:username},(err,source)=>{
        if(err){
            return res.status(500).send({message:`Error al realizar la busqueda de la fuente ${err}`})
        }
        if(!source){
            return res.status(404).send({message:`Fuente no existe!`})
        }else{
            return res.status(200).send(source)
        }
    })
}


module.exports = {
    deleteSource,
    updateSource,
    createSource,
    getSource,
    getSources,
    getSourceByUsername
}   