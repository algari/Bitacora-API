'use strict'

const express= require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const api = require('./routes');
const allowCrossOrigin = require('./middelwares/cors.mid')

app.use(morgan('dev'));

app.use(allowCrossOrigin)

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/api',api)

module.exports = app