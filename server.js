const express = require('express');
const app = express();

//Testing Get functionality
const sayHello = 'Hello World';
app.get('/say-hello', (req, res, next) => {
    console.log(sayHello);
})


//Starts the server
const PORT = 3000;
app.listen(PORT, ()=> {
    console.log(`Server is listening on port ${PORT}`);
})