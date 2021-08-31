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
function updateEnvelopes(req, res, next){
    totalBudget = 0;
    for(let i = 0; i< envelopes.length; i++){
        totalBudget += envelopes[i].amount;
        envelopes[i].id = i;
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

envelopeRouter.param('name', (req, res, next, name)=> {
    let envelopeName = name;
    let found = false;
    for(let i = 0; i<envelopes.length; i++){
        if(envelopes[i].name == envelopeName){
            req.envelopeObject = envelopes[i];
            found = true;
            break;
        }
    }
    if(found){
        next();
    }else{
        res.status(404).send("Envelope not found");
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

//GET request to retrieve a specific envelope
envelopeRouter.get('/:name', envelopeChecker, (req, res, next)=> {
    res.send(req.envelopeObject);
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
    envelopes[newEnvelope.id] = newEnvelope;
    res.status(201).send(envelopes);
    next();
}, updateEnvelopes)

// PUT request to update an envelope
envelopeRouter.put('/:id', envelopeChecker, (req, res, next)=>{
    req.envelopeObject.amount = req.query.amount;
    req.envelopeObject.name = req.query.name;
    envelopes[req.envelopeId] = req.envelopeObject;

    res.status(201).send(envelopes);
    next();
}, updateEnvelopes)


//DELETE request to delete an envelope by id
envelopeRouter.delete('/:id', envelopeChecker, (req, res, next)=>{
    envelopes.splice(envelopes.indexOf(req.envelopeObject), 1);
    res.send(envelopes);
    next();
}, updateEnvelopes)



module.exports = envelopeRouter;