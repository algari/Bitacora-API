'use strict'

const Tag = require('../models/tag');
const conf = require('../config')

function getTags(req,res){
    Tag.find({},(err,tag)=>{
        if(err){
            return res.status(500).send({message:`Error al realizar la busqueda de las etiquetas ${err}`})
        }
        if(!tag){
            return res.status(404).send({message:`No existen Etiquetas!`})
        }else{
            res.status(200).send(tag);
        }
    })
}

function getTag(req,res){
    let tag_id = req.params.tag_id;
    
    Tag.findById(tag_id,(err,tag)=>{
        if(err){
            return res.status(500).send({message:`Error al realizar la busqueda de la etiqueta ${err}`})
        }
        if(!tag){
            return res.status(404).send({message:`Etiqueta no existe!`})
        }else{
            return res.status(200).send(tag)
        }
    })
}

function createTag(req,res){
    let tag = new Tag();
    tag.tag = req.body.tag;
    tag.username = req.body.username;
    tag.description = req.body.description;

    tag.save((err,tagstored)=>{
        if(err){
            res.status(500).send({message:`Error al guardar la etiqueta ${err}`});
        }else{
            res.status(200).send(tagstored); 
        }
    })
}

function updateTag(req,res){
    let tag_id = req.params.tag_id;
    let update = req.body;

    Tag.findByIdAndUpdate(tag_id,update,(err,tagUpdated)=>{
        if(err){
            return res.status(500).send({message:`Error al actulaizar la etiqueta  ${err}`})
        }else{
            res.status(200).send(tagUpdated); 
        }
    })
}

function deleteTag(req,res){
    let tag_id = req.params.tag_id;
    Tag.findById(tag_id,(err,tag)=>{
        if(err){
            return res.status(500).send({message:`Error al borrar la etiqueta ${err}`})
        }
        tag.remove(err=>{
            if(err){
                return res.status(500).send({message:`Error al borrar la etiqueta ${err}`})
            }else{
                res.status(200).send({message:`La etiqueta ha sido eliminado ${tag}`}); 
            }
        })
    })
}

function getTagByUsername(req,res){
    let username = req.params.username;
    //Tag.find({username:username},(err,tag)=>{
    Tag.find({username:{ $in: [username, conf.GENERAL] }},(err,tag)=>{
        if(err){
            return res.status(500).send({message:`Error al realizar la busqueda de la etiqueta ${err}`})
        }
        if(!tag){
            return res.status(404).send({message:`Etiqueta no existe!`})
        }else{
            return res.status(200).send(tag)
        }
    })
}


module.exports = {
    deleteTag,
    updateTag,
    createTag,
    getTag,
    getTags,
    getTagByUsername
}   