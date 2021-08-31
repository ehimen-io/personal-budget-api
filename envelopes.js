const express = require('express');
const envelopeRouter = express.Router();

const envelopes = {
    totalBudget: 0
};

function envelopeChecker(req, res, next){
    if(envelopes.totalBudget === 0){
        res.status(401).send("No envelope created")
    }else{
        next();
    }
}

//GET request for all envelopes
envelopeRouter.get('/', envelopeChecker, (req, res, next)=> {
    res.status(201).send(envelopes);
})

//GET request to receive total budget
envelopeRouter.get('/total-budget', envelopeChecker, (req, res, next)=>{
    res.status(201).send(envelopes.totalBudget.toString());
})





module.exports = envelopeRouter;