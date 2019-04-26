var http = require('http')
var url = require('url');
var fs = require('fs');//看网页文件用的

const path = require('path')
// 创建server
var server = http.createServer();

var list = [
    { id: 1, name: '奔驰', ctime: new Date() },
    { id: 2, name: '宝马', ctime: new Date() },
]

var users = []
var id = 2;
// 3.服务器处理请求
server.on('request', (req, res) => {
    var urlObj = url.parse(req.url, true);
    var params = urlObj.query;
    var fileName = ''
    var pathName = urlObj.pathname;
    if (pathName === '/getAllList') {
        res.end(JSON.stringify({ msg: list }))
    } else {
        if (pathName === '/') {
            fileName = './ajax请求.html';
        } else {
            fileName = '..' + decodeURI(req.url)
        }
        // console.log('req:' + JSON.parse(req))
        fs.readFile(fileName, 'utf-8', function (err, data) {
            // fs.readFile('../1.v-cloak的学习.html', 'utf-8', function (err, data) {
            if (err) {
                // 文件不存在，读取失败
                res.statusCode = 404
                res.setHeader('content-type', 'text/html;charset=utf-8')
                res.end('你访问的页面不存在!')
            } else {
                // 文件存在
                res.setHeader('content-type', 'text/html;charset=utf-8')
                res.end(data)
            }
        });
    }
})
//监听request请求事件
// server.on('request', function (req, res) {
//     console.log(`收到请求，路径为${req.url}`)
//     res.writeHeader(200, { 'Content-Type': 'text/javascript;charset=UTF-8' });
//     // res.addHeader("Access-Control-Allow-Origin", "http://write.blog.csdn.net");
//     var method = req.method;
//     var result = { status: 1 };//1：success  0:error
//     var urlObj = url.parse(req.url, true);
//     var params = urlObj.query;
//     if (urlObj.pathname === '/') {
//         //response.writeHead(响应状态码，响应头对象): 发送一个响应头给请求。
//         res.writeHead(200, { 'Content-Type': 'text/html' })
//         // 如果url=‘/’ ,读取指定文件下的html文件，渲染到页面。
//         fs.readFile('./ajax请求.html', 'utf-8', function (err, data) {
//             // fs.readFile('../1.v-cloak的学习.html', 'utf-8', function (err, data) {
//             if (err) {
//                 throw err;
//             }
//             res.end(data);
//         });
//         return;
//     }
//     switch (urlObj.pathname) {
//         case '/getAllList':
//             result["msg"] = list;
//             break;
//         case '/removeItem':
//             // 解析 url 参数
//             //parse将字符串转成对象,req.url="/?url=123&name=321"，true表示params是{url:"123",name:"321"}，false表示params是url=123&name=321
//             let index = list.findIndex(item => {
//                 if (item.id == params.id) {
//                     return true
//                 }
//             })
//             if (index != -1) {
//                 list.splice(index, 1);
//             } else {
//                 result.status = 0
//                 result['errorMsg'] = "404 Not Found"
//             }
//             break
//         case '/addItem':
//             // //2.注册data事件接收数据（每当收到一段表单提交的数据，该方法会执行一次）
//             req.on('data', function (chunk) {
//                 console.log('chunk:' + chunk);
//                 body += chunk;  //一定要使用+=，如果body=chunk，因为请求favicon.ico，body会等于{}
//                 //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
//                 req.on('end', function () {
//                     body = querystring.parse(body);  //将一个字符串反序列化为一个对象
//                     var name = body.name;
//                     id++;
//                     let index = list.findIndex(item => {
//                         if (item.name == name || item.id == id) {
//                             return true
//                         }
//                     })
//                     if (index == -1) {
//                         list.push({ id: id, name: name, ctime: new Date() })
//                     } else {
//                         result.status = 0
//                         result['errorMsg'] = "404 Not Found"
//                     }
//                 });
//             });
//             break;
//         default:
//             // res.statusCode = 404
//             result.status = 0
//             result['errorMsg'] = "404 Not Found"


//     }
//     // 返回的数据参数只可以是字符串，或者二进制数据
//     //返回响应数据，可以直接res.end(str)
//     res.write(JSON.stringify(result));
//     res.end();
// })

// 绑定端口
server.listen(8000, function () {
    console.log('服务器启动成功')
})