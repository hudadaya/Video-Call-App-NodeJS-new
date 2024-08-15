let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);
let stream = require('./ws/stream');
let path = require('path');
let favicon = require('serve-favicon');

app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


io.of('/stream').on('connection', stream);

server.listen(3000);
// 将服务器绑定到局域网 IP 地址
// server.listen(3000, '192.168.31.245');