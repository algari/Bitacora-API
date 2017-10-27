'use stritc'

const service = require('../services')

function isAuth(req, res,next){
    if(!req.headers.apitoken){
        return res.status(403).send({message:'No tiene autorización :('})
    }

    const token = req.headers.apitoken
    service.decodeToken(token)
    .then(response=>{
        //req.user = response
        next()
    })
    .catch(response=>{
        res.status(response.status)
    })
}

module.exports = isAuth