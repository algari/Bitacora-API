'use strict'

const mongoose = require('mongoose');
const shema = mongoose.Schema;

const StrategyShema = shema({
    _id:String,
    strategy: {type:String, unique:true},
    username: String,
    description: String
})

module.exports = mongoose.model('Strategie',StrategyShema);