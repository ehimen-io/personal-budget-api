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
    totalBudget = 0;
    for(let i = 0; i< envelopes.length; i++){
        totalBudget += envelopes[i].amount;
    }
}

envelopeRouter.param('id', (req, res, next, id)=> {
    let envelopeId = Number(id);
    if(envelopes[envelopeId]){
        req.envelopeId = envelopeId;
        req.envelopeObject = envelopes[envelopeId];
        next();
    }else{
        res.status(400).send("Envelope Id not valid");
    }
})

//GET request for all envelopes
envelopeRouter.get('/', envelopeChecker, (req, res, next)=> {
    res.send(envelopes);
})

//GET request to receive total budget
envelopeRouter.get('/total-budget', envelopeChecker, (req, res, next)=>{
    res.send(totalBudget.toString());
})

//POST request to create an envelope
envelopeRouter.post('/', (req, res, next)=> {
    let newEnvelope = req.body;
    for(let i = 0; i< envelopes.length; i++){
        if(envelopes[i].name === newEnvelope.name){
            return res.status(400).send("Envelope already exists");
        }
    }
    newEnvelope.amount = parseInt(newEnvelope.amount);
    newEnvelope['id'] = envelopes.length;
    envelopes.push(newEnvelope);
    res.status(201).send(envelopes);
    next();
}, updateTotalBudget)

// PUT request to update an envelope
envelopeRouter.put('/:id', envelopeChecker, (req, res, next)=>{
    req.envelopeObject.amount = req.query.amount;
    req.envelopeObject.name = req.query.name;
    envelopes[req.envelopeId] = req.envelopeObject;

    res.status(201).send(envelopes);
    next();
}, updateTotalBudget)






module.exports = envelopeRouter;