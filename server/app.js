const koa = require("koa");
const app = new koa();
const {config} = require('./config');

// 性能监控
const easyMonitor = require("easy-monitor");
easyMonitor("BFF");

//swig页面模版注册(ctx.body可以吐html 字符串 不方便)
const co = require("co");
const render = require("koa-swig");
//路由初始化
const initRouter = require("./controller/index");
//静态文件设置
const staticServe = require("koa-static");

const initError =  require("./middlewares/errorHandle");

console.log("initError---",initError)

//log4js
const { logError,logger} = require("./utils/log");

// 解析post 表格 和 json 文件
// bodyparser 必须在router 之前被注册
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

//logger.info("123")

// 跨域设置
const cors = require('koa2-cors');
app.use(cors(
    {
        origin: function(ctx) { //设置允许来自指定域名请求
            if (ctx.url ) {
                return '*'; // 允许来自所有域名请求
            }
            return 'http://192.168.1.5:8080'; //只允许http://localhost:8080这个域名的请求
        },
        maxAge: 5, //指定本次预检请求的有效期，单位为秒。
        credentials: true, //是否允许发送Cookie
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
    }
));




//路由注册
initRouter(app);

app.context.render = co.wrap(render({
    root:config.viewsDir,
   // cache:'memory',
    ext: 'html',
}));


app.use(staticServe(config.staticDir));





// 错误处理
initError(app);

//koa 自带error  如果想捕获接口404 则无法捕获
app.on('error',(err,ctx)=>{
   // console.log("err",);
   logError.error(err);
});


process.on("unhandledRejection",(res,err)=>{
    logError.error(err);
})


module.exports = app.listen(config.port,(err,data)=>{
    console.log(`port ${config.port} start`)
})

//module.exports = app.listen(config.port);