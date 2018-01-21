var socket = io();

function play(instId){
    socket.emit('play',{id:instId})   /// server ko play event bheja
}

$(function(){

    var usernameBox = $('#username')
    var loginBtn = $('#login')
    var sendBtn = $('#send');
    var msgBox = $('#message');
    var chats = $('#chats')

    sendBtn.click(function(){
        socket.emit('msg', {
            message: msgBox.val()
        })
    })

    loginBtn.click(function(){
        socket.emit('login',{username: usernameBox.val()})
        usernameBox.val("");
    })


    socket.on('logged_in', function(data){
        $('#loginbox').css('display', 'none')
        $('#chatapp').css('display', 'block')
        $('#musicbox').css('display', 'block')
    })

    socket.on('msg', function(data){
        chats.append(
            `<li>${data.sender} : ${data.message}</li>`
        )
    })

    socket.on('play', function(data){       ///jo server sse "play"  event aaya
        var instrument = $('#a' + data.id)[0]
        instrument.play()
    })

})