const http = require('http')
const server = http.createServer(function(req,res){
    res.writeHead('200',{'Content-Type':'text/html'})
    res.write('hello');
    res.end;

})

server.listen('000',function(){
    console.log('serverr started http://127.0.0.1:6000')
})