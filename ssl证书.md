在 CentOS 上生成自签名 SSL 证书，并配置 Node.js 应用以支持 HTTPS，步骤如下：

### 1. 生成自签名 SSL 证书

首先，你需要安装 `openssl` 工具：

```bash
sudo yum install openssl
```

然后，生成一个自签名的 SSL 证书：

```bash
# 创建存放证书的目录
mkdir -p /etc/ssl/myapp

# 生成私钥
openssl genrsa -out /etc/ssl/myapp/myapp.key 2048
输入一个4位以上的密码。

# 生成证书签名请求 (CSR)
openssl req -new -key /etc/ssl/myapp/myapp.key -out /etc/ssl/myapp/myapp.csr -subj "/C=CN/ST=guangdong/L=guangzhou/O=aaa/OU=aa/CN=更换成ip"

# 生成自签名证书
openssl x509 -req -days 365 -in /etc/ssl/myapp/myapp.csr -signkey /etc/ssl/myapp/myapp.key -out /etc/ssl/myapp/myapp.crt
```

在上面的过程中，你会被要求输入一些信息，比如国家、组织名称等。你可以根据实际情况填写这些信息。

### 2. 配置 Node.js 应用支持 HTTPS

接下来，需要在你的 Node.js 应用中配置 HTTPS 支持。假设你已经在 `app.js` 文件中配置了一个 HTTP 服务器，下面是如何修改它以支持 HTTPS：

```javascript
let express = require('express');
let https = require('https');
let http = require('http');
let fs = require('fs');
let app = express();

// 读取 SSL 证书和私钥
let privateKey = fs.readFileSync('/etc/ssl/myapp/myapp.key', 'utf8');
let certificate = fs.readFileSync('/etc/ssl/myapp/myapp.crt', 'utf8');

let credentials = { key: privateKey, cert: certificate };

// 配置 Express 应用
app.use(express.static('public'));

// 添加路由
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// 创建 HTTPS 服务器
let httpsServer = https.createServer(credentials, app);

// 如果需要，你还可以继续监听 HTTP 请求并重定向到 HTTPS
let httpServer = http.createServer(app);
httpServer.listen(8090, () => {
    console.log('HTTP Server running on port 8090');
});

// 启动 HTTPS 服务器
httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});
```

### 3. 测试和验证

1. 确保你的应用在服务器上正常启动，使用以下命令启动你的应用：

   ```bash
   node app.js
   ```

2. 通过 `https://your-server-ip` 访问你的应用，浏览器可能会提示你的证书不受信任，因为它是自签名的，这是正常现象。