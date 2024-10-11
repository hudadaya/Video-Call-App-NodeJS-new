## 部署流程

### Step1 创建云服务器

- 购买一台云服务器（CVM），选择合适的实例类型和操作系统
- 配置服务器的安全组规则，确保允许 HTTP（80 端口）、HTTPS（443 端口）和应用使用的端口（如 3000）访问

### Step2 连接到服务器

- 通过SSH连接到你的腾讯云服务器。在本地终端或SSH客户端中运行以下命令：

  ```
  ssh root@your-server-ip
  ```
  
- `your-server-ip` 是你的服务器IP地址，初次登录时，使用购买服务器时设置的密码或SSH密钥

### Step3 安装 Node.js 和 npm

- 在服务器上安装Node.js和npm：

  ```
  sudo yum update
  sudo yum install nodejs npm
  ```

### Step4 获取项目代码

- 使用 Git 将项目代码克隆到服务器上：

  ```
  git clone https://github.com/IvonnaZhang/VideoConnect.git
  ```

- 进入文件夹

  ````
  cd VideoConnect
  ````

### Step5 安装项目依赖

- 运行以下命令安装项目的所有依赖：

  ```
  npm ci
  ```

### Step6 启动应用

- 直接运行应用：

  ```
  node src/app.js
  ```
  

### Step7 访问并测试

- 在浏览器中访问你的域名或IP地址，测试应用是否正常工作

  ````
  https://your-server-ip:8090
  ````



---

### Tips

- 要实现视频和语音功能，由于安全问题在需保证访问地址为 HTTPS，而这需要 SSL 证书，生成自签名 SSL 证书步骤如下：

  - 首先，你需要安装 `openssl` 工具：

    ````
    sudo yum install openssl
    ````


  - 然后，生成一个自签名的 SSL 证书：

    ````
    # 创建存放证书的目录
    mkdir -p /etc/ssl
    
    # 生成私钥
    openssl genrsa -out /etc/ssl/test.key 2048
    
    # 生成证书签名请求 (CSR)
    openssl req -new -key /etc/ssl/test.key -out /etc/ssl/test.csr -subj "/C=CN/ST=guangdong/L=shenzhen/O=group/OU=unit/CN=更换成ip"
    
    # 生成自签名证书
    openssl x509 -req -days 365 -in /etc/ssl/test.csr -signkey /etc/ssl/test.key -out /etc/ssl/test.crt
    ````
