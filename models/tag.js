'use strict'

const mongoose = require('mongoose');
const shema = mongoose.Schema;

const TagShema = shema({
    tag: {type:String},
    username: String,
    description: String
})

module.exports = mongoose.model('Tag',TagShema);