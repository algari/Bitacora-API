'use strict'

const mongoose = require('mongoose');
const shema = mongoose.Schema;

const StrategieShema = shema({
    strategie: String
})

module.exports = mongoose.model('Strategie',StrategieShema);