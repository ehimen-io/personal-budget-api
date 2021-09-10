const express = require('express');
const app = express();
const cors = require('cors');
const pathToSwaggerUI = require('swagger-ui-dist').absolutePath();

const envelopeRouter = require('./envelopes/envelopes');
const usersRouter = require('./users/users');
const bodyParser = require('body-parser');


//Global middleware
app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)
app.use(express.static(pathToSwaggerUI));

app.use('/envelopes', envelopeRouter);
app.use('/users', usersRouter);

//Starts the server
const PORT = 5000;
app.listen(PORT, ()=> {
    console.log(`Server is listening on port ${PORT}`);
})