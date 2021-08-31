const express = require('express');
const app = express();
const cors = require('cors');
const envelopeRouter = require('./envelopes');
const bodyParser = require('body-parser');


//Global middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/envelopes', envelopeRouter);

//Starts the server
const PORT = 5500;
app.listen(PORT, ()=> {
    console.log(`Server is listening on port ${PORT}`);
})