// 初始化所有路由
const Router  = require("koa-router");
const router = new Router();
const indexController = require("./indexController");

const indexInstance =  new indexController() ;

const {config} = require("./../config");
const fs = require("fs");
const {resolve} = require("path");

const {  streamMergeRecursive,
    exitsFolder,
    exitsDirectory,
    mkdirSync,
    unlinkSync,
    renameSync,
    copy } =  require('../utils/streamMerge');


// 文件上传模块

const multer = require('koa-multer');
const storage = multer.diskStorage({
    destination:config.uploadDir + new Date().getFullYear() + (new Date().getMonth()+1) + new Date().getDate(),
    filename:function(ctx,file,cb){
      const filenameArr = file.originalname.split('.');
      cb(null,filenameArr[0] + '-' + Date.now() + '.' + filenameArr[filenameArr.length-1]);
    }
});
const upload = multer({storage:storage});



const upload2 = multer({dest:config.uploadDir});

function initRouter(app){

    router.get('/data',async(ctx)=> {
        indexInstance.init(ctx);
    });

    router.post("/upload", upload.single('file'),async (ctx)=>{
        // console.log('ctx.request.file', ctx.req.file);
        // console.log('ctx.req', ctx.req);
        // console.log('ctx.request.body', ctx.request.body);
        ctx.body = ctx.req.file.filename;
    });


    router.post("/uploadChunk", upload2.single('file'),async (ctx)=>{
        console.log('ctx.request.file', ctx.req.file);
        console.log('ctx.req', ctx.req.body);
       
        const {hash,name} =  ctx.req.body;

        //判断是否是文件夹
        //如果不是 创建文件夹
        const  directoryPath = resolve(__dirname,config.uploadDir+hash+"-folder");
        if(!exitsFolder(directoryPath)) mkdirSync(directoryPath);

        //获取文件名 重命名
        const resourcePath = resolve(__dirname,config.uploadDir+ctx.req.file.filename);
        const newPath = resolve(__dirname,config.uploadDir+name);
        console.log("resourcePath",resourcePath,"newPath",newPath)
        renameSync(resourcePath,newPath);

        //文件复制
        const readStream = newPath,writeStream = resolve(__dirname,config.uploadDir+hash+"-folder/"+name);
        copy(readStream,writeStream);
        // 文件删除
        return;
        fs.rename(sourceFile,newSource,function(err){
            if(err){
                console.log("文件失败",err);
            }else{
                console.log("文件成功");
            };
        });
        // 重写文件名
        ctx.body = ctx.req.file.filename;
    });


    //合并文件
    router.post("/merge",async(ctx)=>{
       console.log('--------------',ctx.request.body);
        const { hash, ext } = ctx.request.body;
       // 读取文件
       const dest   = config.uploadDir + new Date().getFullYear() + (new Date().getMonth()+1) + new Date().getDate() ;
       console.log("dest",dest);
       setTimeout(()=>{
            const sourceFileArr = fs.readdirSync(dest);
            console.log("sourceFileArr--------",sourceFileArr)
            sourceFileArr.sort((a,b)=> (a.split(":")[1] - b.split(":")[1]));
            //合并文件 参考资料 //https://zhuanlan.zhihu.com/p/131627741
            //fs.createWriteStream 不会创建不存在的文件夹
            const fileWriteStream = fs.createWriteStream(resolve(dest,hash+'.'+ext)); // 创建一个可读写的流 
          //  console.log('fileWriteStream',fileWriteStream) ;      
            streamMergeRecursive(sourceFileArr, fileWriteStream , dest );
       },1000);
       // 按切片顺序排序
       ctx.body = "ok"
    });

    /**
     *  @describe  返回服务器已存在文件
     *  
     * **/

    

    

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