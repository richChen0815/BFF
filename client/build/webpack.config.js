// 获取模式
const  {argv} = require("yargs");
const isProd = (argv.mode === 'development') 
const {merge} =  require("webpack-merge");
const baseConfig = require('./webpack.base');
const dev = require("./webpack.development");
const prod = require("./webpack.production");
const {join,resolve} = require("path");

const htmlWebpackPlugin = require("html-webpack-plugin");
//动态构建 entry  plugin: webpack-html-plugin

    // step1 获取目录下的文件 npm  glob
    // step2 

const glob = require("glob");
// 相对路径获取不到
const cwd = process.cwd();
const files = glob.sync(cwd + "/client/public/**/*.entry.js");

console.log("fileArr",files);

let entry = {}; 
const plugins = [];
files.map(item=>{
    console.log("item",item)
    const reg = new RegExp(/(\w{0,}\-\w{0,})\.entry\.js$/,'ig');
    if(reg.test(item)){
       console.log(RegExp.$1)  // book-create 
       const [pageName, entryName] =  RegExp.$1.split("-");
       console.log(pageName, entryName);
       entry[entryName]    =  item;  
       
       plugins.push(
            new htmlWebpackPlugin({
                filename:`${pageName}-${entryName}.html`,
                template:join(__dirname,`./../views/src/page/${entryName}.html`),
                chunks:[entryName]
            })
       )

       
    }
});
console.log("plugins",plugins);





baseConfig.entry = entry;
baseConfig.mode = argv.mode;


baseConfig.plugins = plugins;

console.log("baseConfig",baseConfig);












module.exports = merge(baseConfig,isProd?prod:dev);