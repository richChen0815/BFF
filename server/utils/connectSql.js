const mysql = require("mysql");
const {logError,logger} = require('./log');
const {config} =  require("../config/index");
function query(sql,params,callback){
    return new Promise((resolve,reject)=>{
        const mysqlBase = mysql.createConnection(config.dataBase);
         mysqlBase.connect((error,success)=>{
            if (error) {
                console.log("open connect error!!!",error);
                logError.error('err',error)
                reject(error)
            };
         });
         mysqlBase.query(sql,params,(error,result,fields)=>{
             console.log('sql query',sql,params);
             if(error){
                console.log('error',error);
                logError.error('err',error)
                reject(error);
                return;
             };
             //console.log(error,result,fields);
            //callback&&callback(error,result,fields);
             resolve({
               // error,
                result,
               // fields
             });
         });
         
         
         mysqlBase.end((err,success)=>{
            if(err){
                console.log("close connect error!!!",err);
                reject(err)
            }
         });
    });
    
}

module.exports = {
    query,
}