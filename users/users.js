const express = require('express');
const usersRouter = express.Router();
const pool = require('../db/db.js');


//Get Request handler to retreive all users
usersRouter.get('/', (req, res, next)=>{
    pool.query(
        'select fname,lname from users order by id asc limit 10;',
        (error, results) => {
            if(error){
                res.status(400).send(error.detail);
            }else{
                res.json(results.rows);
            }
        }
    )
})

//GET request handler to retrieve a single user by id
usersRouter.get('/:id', (req, res, next)=> {
    pool.query(
        `select fname,lname from users where id = $1;`,[req.params.id],
        (error, results) => {
            if(error){
                res.status(400).send(error.detail);
            }else{
                res.json(results.rows);
            }
            
        }
    )
})

//Post request handler to create a new user
usersRouter.post('/', (req, res, next)=> {
    const {fname, lname} = req.body;
    pool.query(
        `insert into users(fname,lname) values($1,$2);`,[fname,lname],
        (error, results) => {
            if(error){
                res.status(400).send(error.detail)
            }else{
                res.send(`User Created`);
            }
            
        }
    )
})

//PUT request handler to update an existing user
usersRouter.put('/:id', (req, res, next) => {
    const {fname, lname} = req.query;
    pool.query(
        `update users set fname = $1, lname = $2 where id = $3 `,[fname,lname, req.params.id],
        (error, results) => {
            if(error){
                res.status(400).send(error.detail);
            }else{
                res.send(`User Updated`);
            }
            
        }
    )
})

//Delete a user by id
usersRouter.delete('/:id', (req, res, next)=> {
    pool.query(
        `delete from users where id = $1`, [req.params.id],
        (error, results) => {
            if(error){
                res.status(400).send(error.detail);
            }else{
                res.send(`User Deleted`);
            } 
        }
    )
})

module.exports = usersRouter;