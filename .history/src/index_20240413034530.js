const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { title: 'Express App', message: 'Hello, world!' });
  });

const port = 5000;
app.listen(port,() =>{
    console.log('server running on port: ${port}')
})