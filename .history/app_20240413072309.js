const http = require('http');
const fs = require('fs');
const {URLSearchParams} =require('url');
 
const mongoose =require('mongoose');
const { name } = require('ejs');
mongoose.connect('mongodb://127.0.0.1/:27017/stud')
     .then(function(){
        console.log('db connected')
    })
const studentschema= new mongoose.Schema({name:}) 


const server = http.createServer((req, res) => {
    if (req.url ==='/'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream('register.html').pipe(res);

    }
    else if(req.url ==='/signup' && req.method ==='POST'
    ){
        var raw ='';
        req.on('data',function(data){
            raw += data;
        })
        req.on('end',function(){
            var formatdata =new URLSearchParams(raw);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('<h1>Signup Successful</h1>');
            res.write('Name:'+ formData.full_name + "<br>");
            res.write('Date of Birth:'+ formData.dob + "<br>");
            res.write('Gender:'+ formData.gender + "<br>");
            res.write('Nationality:'+ formData.nationality + "<br>");
            res.write('Phone Number:'+ formData.phone_number + "<br>");
            
            res.end();
        })
     }
  })

  server.listen('8000', function() {
    console.log('Server running at http://127.0.0.1:8000')
  })