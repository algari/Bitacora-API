/**
 * Created by agalvis on 11/11/2017.
 */
'use strict'

const mongoose = require('mongoose');
const shema = mongoose.Schema;

const SourceShema = shema({
    source: {type:String},
    username: String,
})

module.exports = mongoose.model('Source',SourceShema);