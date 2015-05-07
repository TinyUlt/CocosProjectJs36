var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    mysql = require('mysql');
    users = [];
//specify the html we will use
app.use('/', express.static(__dirname + '/www'));
//bind the server to the 80 port
//server.listen(3000);//for local test
server.listen(process.env.PORT || 8000);//publish to heroku
//server.listen(process.env.OPENSHIFT_NODEJS_PORT || 3000);//publish to openshift
//console.log('server started on port'+process.env.PORT || 3000);
//handle the socket


var db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'cocos'
});

query(db);
function query(client){
    client.query(
        'select * from js',
        function(err, res, fields){
            console.log(res[0]);
            
            client.end();
        })
}


//在这connection中设置服务器逻辑
//io.sockets.emit 全网发送(包括自己), socket.broadcast.emit(不包括自己)
io.sockets.on('connection', function(socket) {
    //new user login
    socket.on('login', function(nickname) {
       socket.emit('loginSuccess');
    });

    socket.on('startTimeUpdate', function() {
        setInterval(function (){
            socket.emit('timeUpdate');
        },1000);//1000为1秒钟
    });
    //user leaves
    socket.on('disconnect', function() {
        users.splice(socket.userIndex, 1);
        socket.broadcast.emit('system', socket.nickname, users.length, 'logout');
    });
    //new message get
    socket.on('postMsg', function(msg, color) {
        socket.broadcast.emit('newMsg', socket.nickname, msg, color);
    });
    //new image get
    socket.on('img', function(imgData, color) {
        socket.broadcast.emit('newImg', socket.nickname, imgData, color);
    });
});