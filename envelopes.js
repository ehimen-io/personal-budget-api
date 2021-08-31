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
    res.send(envelopes);
})

//GET request to receive total budget
envelopeRouter.get('/total-budget', envelopeChecker, (req, res, next)=>{
    res.send(envelopes.totalBudget.toString());
})

//POST request to create an envelope
envelopeRouter.post('/', (req, res, next)=> {
    const envelopeName = req.body.Name;
    const envelopeAmount = parseInt(req.body.Amount);
    envelopes.totalBudget += envelopeAmount

    envelopes[envelopeName] = envelopeAmount;
    res.status(201).send(envelopes);
})




module.exports = envelopeRouter;