// let express = require('express');
// let app = express();
// let server = require('http').Server(app);
// let io = require('socket.io')(server);
// let stream = require('./ws/stream');
// let path = require('path');
// let favicon = require('serve-favicon');

// app.use(favicon(path.join(__dirname, 'favicon.ico')));
// app.use('/assets', express.static(path.join(__dirname, 'assets')));

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });


// io.of('/stream').on('connection', stream);

// server.listen(8091);
// 将服务器绑定到局域网 IP 地址
// server.listen(3000, '192.168.31.245');
let express = require('express');
let https = require('https');
let fs = require('fs');
let app = express();
let path = require('path');
let favicon = require('serve-favicon');
let stream = require('./ws/stream');

// 读取 SSL 证书和私钥
let options = {
    key: fs.readFileSync('/etc/ssl/test.key'),
    cert: fs.readFileSync('/etc/ssl/test.crt')
};

// 设置 favicon
app.use(favicon(path.join(__dirname, 'favicon.ico')));
// app.use(favicon('https://119.29.209.61:8092/favicon.ico'));

// 设置静态资源目录
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// 设置根路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 创建 HTTPS 服务器并赋值给 server 变量
let server = https.createServer(options, app);

// WebSocket 连接
let io = require('socket.io')(server);  // 使用已定义的 server 变量
io.of('/stream').on('connection', stream);

// 服务器监听端口
server.listen(8090, () => {
    console.log('Server is running on https://localhost:8090');
});
