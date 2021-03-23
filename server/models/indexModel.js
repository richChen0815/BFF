const Model = require("./index");
const {query} = require("../utils/connectSql")
const httpAjax = require("../utils/httpRequest");
const { logError } = require("../utils/log");
/**
 *  cattle 列表数据层
 * **/
class indexModel extends Model{
    constructor(){
        super();   
    }

    // 🐂列表数据查询
    async cattleModel(ctx,next){
        // const options = { };
        // await this.httpAjax(options);
        const params = `select * from _cattle_info`;
        const res = await query(params);
        console.log("cattleModel",res);
        return res;
    }
    // 🐂接种数据查询
    async gestationModel(){
        // const options = { };
        // await this.httpAjax(options);
        const params = `select * from _gestation_info`;
        const res = await query(params);
        console.log("gestationModel",res);
        return res;
    }
    // 🐂接种数据录入

    async insertGestationModel(params){
        const {cid,type,inoculateDay,dueTimeDay,describe} = {...params};
        console.log("接种数据插入",params)
        // 插入数据
        const insert = `INSERT INTO _gestation_info (cid,type,inoculateDay,describes) VALUES (${cid},'${type}',STR_TO_DATE('${inoculateDay}',"%Y-%m-%d"),'${describe}')`;
        const res = await query(insert);
        console.log("res",res);
        return res;

    }

    // 🐂录入
    async insertCattleModel(params){
        const {cid,pid,gid,sex,color,birth,resource,isEasy,describe,avator,weight} = {...params};
        console.log("🐮数据插入",params)
        const insert = `INSERT INTO _cattle_info (cid,pid,gid,avator,sex,color,birth,resource,isEasy,describes,weight) VALUES (${cid},${pid},${gid},'${avator}','${sex}','${color}',STR_TO_DATE('${birth}',"%Y-%m-%d"),'${resource}',${isEasy},'${describe}',${weight})`;
        let res;
        try{
           res = await query(insert);
        }catch(e){
            console.log("e",e);
            logError.error("error",e);
            return {
                code:-1,
                message:'录入失败'
            };
        }
       
        console.log("res",res);


        // 查询 pid gid 容易查询空记录 录入母牛数据 
        const sQuery   = `SELECT * from _gestation_info where cid = ${pid} and gid = ${gid} `;

        const results = await query(sQuery);

        if(results.result.length === 0){
            return {
                code:1,
                message:'录入成功',
            };
        };      

        // 如果存在 即更新生产日期
        const sql = `UPDATE  _gestation_info SET dueTimeDay = STR_TO_DATE('${birth}',"%Y-%m-%d")   where cid = ${pid} and gid = ${gid}`; 
        const result = await query(sql);
        if(result.result.affectedRows == 1){
        // 更新
            return {
                code:1,
                message:'录入成功'
            };
        }

       
    }

    // 首页列表拼接数据结构
    /*{
        cid:1,
        sex:'母',
        color:'白黑',
        //isEasy:true,
        birth:'2021-01-01',
        health:'',
        resource:'下崽',
        avator:'',
        describe:'',
        // 受孕列表  关联牛id
        gestation:[   
            {
                gid:1,
                cid:1,
                birth:'2020-01-11',
                type:'xx型号',//受精型号
                inoculateDay:'2020-01-11',//接种时间
                //pregnancyCycle:'',// 受孕周期  40天到-50天
                gestationTimeCycle:'',//怀孕中间段
                dueTimeDay:'',//下崽时间
                cultivationCycle:'',//修养时间
            },
	    ]
    } */
    async getCattleTreeModel(){
        // 查询所有接种数据
        const params1 = `select * from _gestation_info`;
        const res1 = await query(params1);
        //查询cattle 列表
        const params2 = `select * from _cattle_info`;
        const res2 = await query(params2);

        
        return {
           gestation: res1,
           cattle: res2
        }
    }


}


module.exports = indexModel;