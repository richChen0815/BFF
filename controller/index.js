// 初始化所有路由
const Router  = require("koa-router");
const router = new Router();
const indexController = require("./indexController");

const indexInstance =  new indexController() ;
console.log("indexInstance",indexInstance)
function initRouter(app){
    router.get('/data',async(ctx)=> {
        indexInstance.init(ctx);
    });

    router.get('/test', indexInstance.init);

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