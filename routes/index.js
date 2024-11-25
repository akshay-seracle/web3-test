/*jslint node: true */
'use strict';

const routes = require('express').Router();

const getCurrencyBalance = require('./question-2/getCurrencyBalance.js');

routes.get('/getCurrencyBalance', getCurrencyBalance);

module.exports = routes;
