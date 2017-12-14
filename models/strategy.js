'use strict'

const mongoose = require('mongoose');
const shema = mongoose.Schema;

const StrategyShema = shema({
    strategy: {type:String},
    username: String,
    description: String
})

module.exports = mongoose.model('Strategie',StrategyShema);