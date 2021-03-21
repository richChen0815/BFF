const Controller  = require("./controller");
const indexModel = require("../models/indexModel");
const request = require("request");
const ModelInstance = new indexModel();

console.log("Controller",Controller)

class indexController extends Controller{
    constructor(){
        super();
    }

    async init(ctx){
       // throw new Error("我错了")
        const data = 1231;
        ctx.body = await ctx.render('index',{data});
    }

    /**
      *   🐂录入
     */

    async insertCattleInfo(ctx){
        const params = ctx.request.body;
        console.log('insertCattleInfo',params)
        const result = await ModelInstance.insertCattleModel(params);
        console.log("result",result);
        ctx.body = result;
     }

    /**
     *  🐂 列表查询
     **/

     async getCattleInfo(ctx){
        console.log("走进来了")
        const result =  await ModelInstance.cattleModel();
        console.log('result',result);
        ctx.body = result;
     }


    /**
     *  接种记录查询
     **/

     async getGestationInfo(ctx){
        const result =  await ModelInstance.gestationModel();
        console.log('result',result);
        ctx.body = result;
     }

     /**
      *    母牛接种记录插入
     */
     async insertGestationInfo(ctx){
         console.log('-----ctx---',ctx.request.body)
         const params = ctx.request.body;
         const result = await ModelInstance.insertGestationModel(params);
         console.log("result",result);
         ctx.body = result;
     }
    /**
      *  首页数据拼接
     */
     async getCattleTree(ctx){
        const result = await ModelInstance.getCattleTreeModel();
        console.log("result",result);
        ctx.body = result;
     }

     
       




}

module.exports = indexController;