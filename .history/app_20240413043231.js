const http = require('http');

const server = http.createServer((req, res) => {
    // Set the response HTTP header with HTTP status and Content type
    res.writeHead(200, {'Content-Type': 'text/html'});
  
    // Send the response body as "Hello World"
    res.end('<h1>Hello World!</h1>');
  })

  server.listen(PORT, IP_ADDRESS, () => {
    console.log(`Server running at http://${IP_ADDRESS}:${PORT}/`);
  })