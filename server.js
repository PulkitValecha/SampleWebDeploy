const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const config = require('./config.js')
//My express app
const app = express();
//the http server on which it runs
const server = http.Server(app)
// The socket io server
const io = socketio(server)

const users = {}

io.on('connection', function(socket){
    console.info("Socket created" + socket.id)

    ///this msg is the event which came from client
    socket.on('msg', function(data){
        ///this msg is the event that is being emitted from server to all pipelines
        socket.broadcast.emit('msg',{
            sender: users[socket.id],
            message: data.message
        })
    })

    socket.on('login',function(data){
        users[socket.id] = data.username;
        console.log( data.username+" logged in")
        console.log(users)
        socket.emit('logged_in')
    })

    socket.on('play', function(data){
       socket.broadcast.emit('play', data)
    })


})

app.use('/',express.static(__dirname+ "/public_static"))

server.listen(config.PORT,()=>{
    console.info("Server started at http://localhost:" + config.PORT)
})