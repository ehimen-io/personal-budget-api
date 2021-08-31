const express = require('express');
const app = express();
const cors = require('cors');
const envelopeRouter = require('./envelopes');

//Global middleware
app.use(cors());
app.use('/envelopes', envelopeRouter);

//Starts the server
const PORT = 3000;
app.listen(PORT, ()=> {
    console.log(`Server is listening on port ${PORT}`);
})