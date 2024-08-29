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

server.listen(8090);
// 将服务器绑定到局域网 IP 地址
// server.listen(3000, '192.168.31.245');
// let express = require('express');
// let https = require('https');
// let fs = require('fs');
// let app = express();
// let io = require('socket.io')(server);
// let stream = require('./ws/stream');
// let path = require('path');
// let favicon = require('serve-favicon');

// // 读取 SSL 证书和私钥
// let options = {
//     key: fs.readFileSync('/etc/ssl/private/myapp.key'),
//     cert: fs.readFileSync('/etc/ssl/certs/myapp.crt')
// };

// // 设置 favicon
// app.use(favicon(path.join(__dirname, 'favicon.ico')));

// // 设置静态资源目录
// app.use('/assets', express.static(path.join(__dirname, 'assets')));

// // 设置根路由
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// // WebSocket 连接
// io.of('/stream').on('connection', stream);

// // 创建 HTTPS 服务器并监听端口
// https.createServer(options, app).listen(8090, () => {
//     console.log('Server is running on https://localhost:8090');
// });
