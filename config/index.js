const path = require("path");

let baseConfig = {
   viewsDir:path.join(__dirname,'./../views/'),
   staticDir:path.join(__dirname,'./../public/'),
   dataBase:{
        host:'106.15.238.244',
        user:'root',
        password:'admin1234',
        port:'3306',        
        database:'cattle',
    },
    uploadDir:path.join(__dirname,'./../public/uploads/')
};

const  proConfig = {
    port:'80',

};

const devConfig = {
    port:'3000'
};

const env = process.env.NODE_MODE === 'production' ? true : false ;

const config = Object.assign(baseConfig,  env ? proConfig : devConfig );

module.exports = {
    config
}