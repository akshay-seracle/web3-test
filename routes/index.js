/*jslint node: true */
'use strict';

const routes = require('express').Router();

const transactionTracking = require('./question-2/transactionTracking.js');
const getCurrencyBalance = require('./question-4/getCurrencyBalance.js');

routes.get('/getCurrencyBalance', getCurrencyBalance);
routes.post('/transactionTracking', transactionTracking);

module.exports = routes;
