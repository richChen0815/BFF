// 公共配置
const path = require("path")
module.exports = {
    mode:'',
    output:{
        filename:'[name].js',
        path:path.join(__dirname,'./../views/dist')
    },
    module:{
        rules:[
            
        ]
    },
    plugins:[]
}