const path = require("path");



const  proConfig = {
    port:'80',

};

const devConfig = {
    port:'3000'
};

console.log("viewsDir",path.join(__dirname,'./../../client/views/'))
let baseConfig = {
    viewsDir:path.join(__dirname,'./../../client/views/'),
    //静态资源访问路径: http://localhost:3000/frontEnd/data.js
    staticDir:path.join(__dirname,'./../../client/public/'),
    dataBase:{
         host:'106.15.238.244',
         user:'root',
         password:'admin1234',
         port:'3306',        
         database:'cattle',
     },
     uploadDir:path.join(__dirname,'./../../client/public/uploads/'),
     originUrl:`http://106.15.238.244:${(process.env.NODE_MODE === 'production') ? proConfig.port : devConfig.port}`,
     localUrl:`http://localhost:${(process.env.NODE_MODE === 'production') ? proConfig.port : devConfig.port}`,
 };

const env = process.env.NODE_MODE === 'production' ? true : false ;

const config = Object.assign(baseConfig,  env ? proConfig : devConfig );

module.exports = {
    config
}