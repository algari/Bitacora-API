'user strict'

const User = require('../models/user')
const service = require('../services') 

function singUp(req,res){
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password : req.body.password
    })

    user.save((err)=>{
        if (err) res.status(500).send({message:`Error al crear el usuario: ${err}`})

        return res.status(200).send({token: service.createToken(user)})
    })
}
function singIn(req,res){
    User.find({email: req.body.email},(err,user)=>{
        if(err) return res.status(500).send({message: err})
        if(!user) return res.status(404).send({message:'No existe el usuario'})

        req.user = user
        res.status(200).send({
            message:'Te has logueado correctamente :)',
            token: service.createToken(user)
        })
    })
}

module.exports={
    singIn,
    singUp
}