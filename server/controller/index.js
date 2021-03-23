// 初始化所有路由
const Router  = require("koa-router");
const router = new Router();
const indexController = require("./indexController");
const indexInstance =  new indexController() ;
const bookController = require("./bookController");
const bookInstance = new bookController();
console.log('bookInstance-----',bookInstance.bookInit);
const {config} = require("../config");
// 文件上传模块
const upload = require("./../utils/upload")


function initRouter(app){

    router.get('/data',async(ctx)=> {
        indexInstance.init(ctx);
    });

    router.post("/upload", upload.single('file'),async (ctx)=>{
        console.log('ctx.request.file', ctx.req.file);
        console.log('ctx.file', ctx.file);
        console.log('ctx.request.body', ctx.request.body);
        ctx.body = ctx.req.file.filename;
    });

    router.get('/test', indexInstance.init);

    // 测试book模版
    router.get('/book', async(ctx)=>{
        bookInstance.bookInit(ctx)
    });

    //🐂 list query
    router.get('/api/cattleInfo',indexInstance.getCattleInfo);
    //🐂 gestation list query
    router.get('/api/gestationInfo',indexInstance.getGestationInfo);
    //🐂 接种 insert
    router.post("/api/insertGestationInfo",indexInstance.insertGestationInfo);
    //🐂 data insert
    router.post("/api/insert",indexInstance.insertCattleInfo);
    // 首页列表查询
    router.get("/api/getCallTree",indexInstance.getCattleTree)




    app.use(router.routes());
    app.use(router.allowedMethods({ 
        // throw: true, // 抛出错误，代替设置响应头状态
        // notImplemented: () => '不支持当前请求所需要的功能',
        // methodNotAllowed: () => '不支持的请求方式'
    }));
}

module.exports = initRouter;