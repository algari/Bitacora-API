'user strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services') 

function singUp(req,res){
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.name,
    })

    user.save((err)=>{
        if (err) res.status(500).send({message:`Error al crear el usuario: ${err}`})

        return res.status(200).send({token:service.createToken(user)})
    })
}