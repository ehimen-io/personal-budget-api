const express = require('express');
const usersRouter = express.Router();
const pool = require('../db/db.js');


usersRouter.get('/', (req, res, next)=>{
    pool.query(
        'select * from users order by id asc',
        (error, results) => {
            if(error){
                throw error;
            }
            res.status(200).json(results.rows);
        }
    )
})

usersRouter.post('/', (req, res, next)=> {
    const {fname, lname, id} = req.body;
    pool.query(
        `insert into users(fname,lname,id) values($1,$2,$3)`,[fname,lname,id],
        (error, results) => {
            if(error){
                throw error;
            }
            res.status(200).send(`User added with ID: ${id}`);
        }
    )
})

module.exports = usersRouter;