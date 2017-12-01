'use strict'

const mongoose = require('mongoose');
const shema = mongoose.Schema;

const GameShema = shema({
    username:String,
    ticker:{type:String},
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
    aon:{type:Number,default:0},
    aonr:{type:Number,default:0},
    chart:String,
    maxMove:{type:Number,default:0},
    tags:[],
    entries:[],
    exits:[],
    status:String
})

module.exports = mongoose.model('Game',GameShema);

