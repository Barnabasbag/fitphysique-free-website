const http = require('http');
const fs = require('fs');

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
            res.write('Name:'+ formdata.get('full_name')+"<br>");
            res.write('dob:'+ formdata.get('dob')+"<br>");
            res.write('gender:'+ formdata.get('gender')+"<br>");
            res.write('nationality:'+ formdata.get('nationality')+"<br>");
            res.write('gender:'+ formdata.get('gender')+"<br>");
            res.write('gender:'+ formdata.get('gender')+"<br>");
            res.write('gender:'+ formdata.get('gender')+"<br>");
        })
     }
  })

  server.listen('8000', function() {
    console.log(`Server running at http://127.0.0.1:8000`);
  })