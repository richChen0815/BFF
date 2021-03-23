const multer = require('koa-multer');
const config = require("./../config/index")
const storage = multer.diskStorage({
    destination:config.uploadDir + new Date().getFullYear() + (new Date().getMonth()+1) + new Date().getDate(),
    filename:function(ctx,file,cb){
      const filenameArr = file.originalname.split('.');
      cb(null,filenameArr[0] + '-' + Date.now() + '.' + filenameArr[filenameArr.length-1]);
    }
});
const upload = multer({storage:storage});

module.exports = upload;