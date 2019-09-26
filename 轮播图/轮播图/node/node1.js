    var http= require("http");
    var server=http.createServer((req,res)=>{
        console.log("有人访问了");
    if(req.url != "/favicon.ico"){
        res.write("<em>你好</em>");
        res.end();
    }
});
    server.listen("85","localhost",()=>{
        console.log("服务开启成功");
    })