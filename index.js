const http = require('http')
const smartHome = require('./modules/smartHome.js')

smartHome.init()

http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'})

  response.end(smartHome.displayingHomeState)
}).listen(8081)

console.log('You can check home state at http://127.0.0.1:8081/\n')
