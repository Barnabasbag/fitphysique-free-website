const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url ==='/'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream('register.html').pipe(res);

    }
    else if(req.url ==='/signup' && req.method ==='POST'
    ){
        var raw =''
    }
  })

  server.listen('8000', function() {
    console.log(`Server running at http://127.0.0.1:8000`);
  })