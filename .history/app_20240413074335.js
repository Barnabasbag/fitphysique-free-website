const http = require('http');
const fs = require('fs');
const {URLSearchParams} =require('url');
 
const mongoose =require('mongoose');
const { name } = require('ejs');
mongoose.connect('mongodb://127.0.0.1/:27017/stud')
     .then(function(){
        console.log('db connected')
    })
const studentschema= new mongoose.Schema({full_name:String,dob:String,gender:String,nationality:String,phone_number:String,email:String,address:String}) 
const studentmodel = mongoose.model('students',studentschema);

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
            studentmodel.create({full_name:formatdata.get('full_name'),
                                dob:formatdata.get('dob'),
                                gender:formatdata.get('gender'),
                                nationality:formatdata.get('nationality'),
                                phone_number:formatdata.get('phone_number'),
                                email:formatdata.get('email'),
                                address:formatdata.get('address')
                            })

            res.wr
            res.end();
        })
     }
  })

  server.listen('8000', function() {
    console.log('Server running at http://127.0.0.1:8000')
  })