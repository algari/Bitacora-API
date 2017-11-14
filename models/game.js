'use strict'

const mongoose = require('mongoose');
const shema = mongoose.Schema;

const GameShema = shema({
    username:String,
    symbol:{type:String},
    type:String,
    time_frame: String,
    strategy: {type:String},
    source:String,
    commission: {type:Number,default:0},
    comments: String,
    result:String,
    neto: {type:Number,default:0},
    netoCmm:{type:Number,default:0},
    r: {type:Number,default:0},
    netoR: {type:Number,default:0},
    percentCaptured: {type:Number,default:0},
    followed:String,
    chart:String,
    maxMove:{type:Number,default:0},
    tags:[],
    entries:[],
    exits:[],
    status:String
})

module.exports = mongoose.model('Game',GameShema);

