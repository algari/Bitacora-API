'use strict'

const mongoose = require('mongoose');
const Shema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const UserShema = new Shema({
    name: {type:String},
    username: {type:String, unique:true},
    password:{type:String, select:false},
    email: {type:String,unique:true},
    api_token:{type:String},
    created_at: {type:Date, default:Date.now()},
    updated_at: {type:Date, default:Date.now()},
    avatar:String
})

UserShema.pre('save',(next)=>{
    let user = this
    //if(!user.isModified('password')) return next()

    bcrypt.genSalt(10,(err,salt)=>{
        if (err) return next(err)

        bcrypt.hash(user.password,salt,null,(err,hash)=>{
            if (err) {
                return next(err)
            }
            user.password = hash
            next()
        })
    })
})

UserShema.methods.gravatar = function(){
    if(!this.email) return `https://gravatar.com/avatar/?s=2000d=retro`

    const md5 = crypto.createHash('md5'.update(this.email).digest('hex'))

    return `https://gravatar.com/${md5}/?s=2000d=retro`
}

module.exports = mongoose.model('User',UserShema)