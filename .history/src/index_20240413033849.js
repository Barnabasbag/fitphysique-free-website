const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express()

const port = 5000;
app.listen(port,() =>{
    console.log('server running on port: ${port}')
})