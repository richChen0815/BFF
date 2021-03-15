// Node connect Java interFace
const rp = require("request-promise");
function httpAjax(options){
    return new Promise((resolve,reject)=>{
        rp(options).then(res=>{
            resolve(res)
        }).catch(err=>{
            resolve(err);
        })
    })
}

module.exports = httpAjax;


