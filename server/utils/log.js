
const log4js  = require("log4js");
log4js.configure({
    appenders: { 
        "globalError": { type: "file", filename: `log/logError-${new Date().toLocaleDateString()}.log`},
        "out":{type: "file", filename: `log/info-${new Date().toLocaleDateString()}.log` }
    },
    categories: { 
       // "globalError": { appenders: ["globalError"], level: "error" },
      out: { appenders: ["out"], level: "info" },
      default:{appenders:['globalError'],level:'error'}
    }
});

   
const logError = log4js.getLogger('globalError');
const logger =  log4js.getLogger('out');
module.exports =  {
    logError,logger
};
