const { application } = require('express');
const express = require('express');
const envelopeRouter = express.Router();
const pool = require('../db/db.js')

const transactionsRouter = require('./transactions/transactions');
envelopeRouter.use('/transactions', transactionsRouter);

//Get Request handler to retreive all envelopes
envelopeRouter.get('/', (req, res, next)=>{
    pool.query(
        'select name, budget, user_id from envelopes order by id asc limit 10;',
        (error, results) => {
            if(error){
                res.status(400).send(error.detail);
            }else{
                res.json(results.rows);
            }
        }
    )
})

//GET request handler to retrieve a single envelope by id
envelopeRouter.get('/:id', (req, res, next)=> {
    pool.query(
        `select name, budget, user_id from envelope where id = $1;`,[req.params.id],
        (error, results) => {
            if(error){
                res.status(400).send(error.detail)
            }else{
                res.json(results.rows);
            }
            
        }
    )
})

//Post request handler to create a new envelope
envelopeRouter.post('/', (req, res, next)=> {
    const {name, budget, user_id} = req.body;
    pool.query(
        `insert into envelopes(name,budget, user_id) values($1,$2, $3);`,[name,budget,user_id],
        (error, results) => {
            if(error){
                res.status(400).send(error.detail);
            }else{
                res.send(`Envelope Created`);
            }
            
        }
    )
})

//PUT request handler to update an existing envelope
envelopeRouter.put('/:id', (req, res, next) => {
    const {name, budget} = req.query;
    pool.query(
        `update envelopes set name = $1, budget = $2 where id = $3 `,[name,budget, req.params.id],
        (error, results) => {
            if(error){
                res.status(400).send(error.detail);
            }else{
                res.send(`Envelope Updated`);
            }
            
        }
    )
})

//Delete an envelope by id
envelopeRouter.delete('/:id', (req, res, next)=> {
    pool.query(
        `delete from envelopes where id = $1`, [req.params.id],
        (error, results) => {
            if(error){
                res.status(400).send(error.detail);
            }else{
                res.send(`Envelopes Deleted`);
            }
            
        }
    )
})


module.exports = envelopeRouter;