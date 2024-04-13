const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url ==='/'){
        res.writeHead(200, {'Content-Type': 'text/html'});

    }
    
  })

  server.listen('8000', function() {
    console.log(`Server running at http://127.0.0.1:8000`);
  })