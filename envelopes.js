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

envelopeRouter.get('/', envelopeChecker, (req, res, next)=> {
    res.status(201).send(envelopes);
})




module.exports = envelopeRouter;