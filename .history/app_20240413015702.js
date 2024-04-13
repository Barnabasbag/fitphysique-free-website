const http = require('http')
const server = http.createServer(function(req,res){
    res.writeHead('200',{'content-type'})

})

server.listen('6000',function(){
    console.log('serverr started http://127.0.0.1:6000')
})