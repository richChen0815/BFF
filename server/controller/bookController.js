const Controller = require("./controller");
const {join,resolve} = require("path");
class bookController extends Controller{
    constructor(){
        super();
    }
    
    async bookInit(ctx){
        //问题 koa-swig 自己文件夹无法成功渲染  系统问题
        ctx.body = await ctx.render("src/page/list",{data:{
            title: 1231,
            content:'xxxxx'
        }})
    }
}

module.exports = bookController;