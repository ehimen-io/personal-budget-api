const express = require('express');
const usersRouter = express.Router();
const pool = require('../db/db.js');


//Get Request handler to retreive all users
usersRouter.get('/', (req, res, next)=>{
    pool.query(
        'select fname,lname from users order by id asc;',
        (error, results) => {
            if(error){
                throw error;
            }
            res.status(200).json(results.rows);
        }
    )
})

//GET request handler to retrieve a single user by id
usersRouter.get('/:id', (req, res, next)=> {
    pool.query(
        `select fname,lname from users where id = $1;`,[req.params.id],
        (error, results) => {
            if(error){
                throw error;
            }
            res.status(200).json(results.rows);
        }
    )
})

//Post request handler to create a new
usersRouter.post('/', (req, res, next)=> {
    const {fname, lname} = req.body;
    pool.query(
        `insert into users(fname,lname) values($1,$2);`,[fname,lname],
        (error, results) => {
            if(error){
                throw error;
            }
            res.status(200).send(results.rows);
        }
    )
})




module.exports = usersRouter;