function initError(app){
    app.use(async(ctx, next)=>{
        let status;
        try {
            ctx.set('Access-Control-Allow-Origin', '*');
            ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
            ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
            await next();
            console.log('ctx.status',ctx.status);
            status = ctx.status ;
            // 404 状态页面
            if(ctx.status === 404){
                ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js"></script>'
            }
        }catch(e){
            console.log("捕获异常",e);
            status = 500;
            ctx.response.status = status;
            ctx.app.emit("error",e)
        }
    });
}
module.exports = initError;
