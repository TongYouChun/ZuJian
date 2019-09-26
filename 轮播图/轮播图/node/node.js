var http = require("http");
// console.log(http);
var server = http.createServer((req,res)=>{
    // req:客户端到服务端
    // res:服务端到客户端
    console.log("有人访问了");
    if(req.url != "/favicon.ico"){
        // console.log(req.url)
        
        res.write("abc")
        
        res.end();
    }
});
server.listen("82","localhost",()=>{
    console.log("服务开启成功")
});