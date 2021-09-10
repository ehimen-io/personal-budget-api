const e = require('express');
const express = require('express');
const transactionsRouter = express.Router();
const pool = require('../../db/db.js')


//Get Request handler to retrieve all transactions
transactionsRouter.get('/', (req, res, next)=> {
    pool.query(
        'select sender_id, receiver_id, amount from transactions order by id asc;',
        (error, results) => {
            if (error){
                res.status(400).send(error.detail);
            }else{
                res.json(results.rows);
            }
        }
    )
})

// Get Request handler to retrieve a single transaction by id
transactionsRouter.get('/:id', (req, res, next)=> {
    pool.query(
        `select sender_id, receiver_id from transactions where id = $1;`,[req.params.id],
        (error, results) => {
            if(error){
                res.status(400).send(error.detail)
            }else{
                res.json(results.rows);
            }
            
        }
    )
})

//POST request handler to create a new transaction
transactionsRouter.post('/', (req, res, next)=> {
    const {sender_id, receiver_id, amount} = req.body;
    pool.query(
        `insert into transactions(sender_id, receiver_id, amount) values ($1, $2, $3);`, [sender_id, receiver_id, amount],
        (error, results) => {
            if(error){
                res.status(400).send(error.detail);
            }else{
                pool.query(
                    'call update_envelopes($1, $2, $3);', [sender_id, receiver_id, amount],
                    (error, results) => {
                        if(error){
                            res.status(400).send(error.detail);
                        }else{
                            res.send('Transaction executed');
                        }
                    }
                )
            }
        }
    )
})

//DELETE request handler to delete a transaction by id
transactionsRouter.delete('/:id', (req, res, next)=> {
    pool.query(
        'delete from transactions where id = $1', [req.params.id],
        (error, results) => {
            if(error){
                res.status(400).send(error.detail);
            }else{
                res.send(`Transaction Deleted`);
            }
        }
    )
})



module.exports = transactionsRouter;
