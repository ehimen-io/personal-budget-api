const { application } = require('express');
const express = require('express');
const envelopeRouter = express.Router();
const pool = require('../db/db.js')

const transactionsRouter = require('./transactions/transactions');
envelopeRouter.use('/transaction', transactionsRouter);


module.exports = envelopeRouter;