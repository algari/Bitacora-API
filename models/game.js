'use strict'

const mongoose = require('mongoose');
const shema = mongoose.Schema;

const GameShema = shema({
    date_in: {type:Date},
    quantity: {type:Number,default:0},
    type:String,
    price_in: {type:Number,default:0},
    time_frame: String,
    price_out: {type:Number,default:0},
    date_out: {type:Date},
    commission: {type:Number,default:0},
    comments: String,
    symbol:{type:String},
    strategy: {type:String},
    result:String,
    neto: {type:Number,default:0},
    netoCmm:{type:Number,default:0}
})

module.exports = mongoose.model('Game',GameShema);

