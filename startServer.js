var http = require('http')
var path = require('path')
var express = require('express')

var apiRoutes = require('./api_routes')

var app = express()

app.use(express.static(path.join(__dirname, 'dist')))

app.use('/api', apiRoutes)

function startServer () {
  server = http.createServer(app).listen(8085, function() {
    console.log('Express 启动 在htpp://localhost: 8085' )
  })
}

startServer()