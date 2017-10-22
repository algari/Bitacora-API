'use strict'

const mongoose = require('mongoose');
const shema = mongoose.Schema;

const SymbolShema = shema ({
    symbol: String,
})

module.exports = mongoose.model('Symbol',SymbolShema);