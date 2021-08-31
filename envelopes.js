const express = require('express');
const envelopeRouter = express.Router();

const envelopes = [];
let totalBudget = 0;

function envelopeChecker(req, res, next){
    if(totalBudget === 0){
        res.status(401).send("No envelope created")
    }else{
        next();
    }
}
function updateTotalBudget(req, res, next){
    if(req.method == "POST"){
        totalBudget += parseInt(req.body.Amount);
        next();
    }
}

//GET request for all envelopes
envelopeRouter.get('/', envelopeChecker, (req, res, next)=> {
    res.send(envelopes);
})

//GET request to receive total budget
envelopeRouter.get('/total-budget', envelopeChecker, (req, res, next)=>{
    res.send(totalBudget.toString());
})

//POST request to create an envelope
envelopeRouter.post('/',updateTotalBudget, (req, res, next)=> {
    let newEnvelope = req.body;
    for(let i = 0; i< envelopes.length; i++){
        if(envelopes[i].name === newEnvelope.name){
            return res.status(400).send("Envelope already exists");
        }
    }
    newEnvelope.amount = parseInt(newEnvelope.amount);
    newEnvelope['id'] = envelopes.length + 1;
    envelopes.push(newEnvelope);
    res.status(201).send(envelopes);
})

// PUT request to update t





module.exports = envelopeRouter;