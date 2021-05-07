const {resolve} = require("path");
const fs = require("fs");
/**
 *  @description 文件合并
 *  @params {String} sourceFiles 源文件目录
 *  @params {String} targetFile  目标目录
*/

function  streamMerge(sourceFiles,targetFile){
    const sourceFileArr = fs.readdirSync(sourceFiles);
    const fileWriteStream = fs.createWriteStream(targetFile); // 创建一个可读写的流
   
}

/** @description 递归合并
 *  @params {Array}  arr 
 *  @params {Stream} writeStream 读写流
 *  @params {String} source 源文件目录
**/

function streamMergeRecursive(arr = [], writeStream , sourceFile ){
    // 递归结束判断
    if(!arr.length){
        console.log("合并结束了")
        return writeStream.end();
    }

    // 当前文件
    const currentFile = resolve(sourceFile,arr.shift());
    // 获取当前可读写流
    const currentReadStream = fs.createReadStream(currentFile);
    // read 可读写流  write 可写入对象
    // read.pipe(write,{});
    currentReadStream.pipe(writeStream,{end:false});
    currentReadStream.on("end",function(){
        streamMergeRecursive(arr,writeStream,sourceFile);
    });
    currentReadStream.on("error",function(error){
        console.log("error");
        writeStream.close();
    });
}



/**
 *   @describe 判断文件是否存在 不存在 创建 存在 啥也不干
 *   @params {String} filePath 
 * **/

function exitsFolder(filePath){
    console.log('文件夹是否存在',fs.existsSync(filePath))
    let  exits = fs.existsSync(filePath) ? true : false;
    return exits;  
}

/**
 *   @describe 判断文件夹是否存在 不存在 创建 存在 啥也不干
 *   @params {String} filePath 
 * **/

 function exitsDirectory(filePath){
    console.log('filePath',filePath)
    return new Promise((resolve,reject)=>{
        try{
            let  stat = fs.statSync(filePath) ;
            console.log("stat",stat);
            console.log('文件夹是否存在',stat.isDirectory());
            if(stat.isDirectory()){
                resolve(true) ;
            }else{
                resolve(false) ;
            }
        }catch(e){
            reject(e)
        }
       
      
    });
}

/**
 *  @description 文件夹创建
 *  @params {String} folderName
 * **/
function mkdirSync(folderName){
    fs.mkdirSync(folderName);
}


/**
 *  @description 文件删除
 *  @params {String} filePath
 * **/
function unlinkSync(filePath){
    console.log('unlinkSync',filePath)
    fs.unlinkSync(filePath);
}



/**
 *  @description 文件重命名
 *  @params {String} folderName
 * **/
function renameSync(oldName, newName){
    fs.renameSync(oldName, newName);
}

/**
 *  @description 文件复制
 *  @params {String} folderName
 * **/
 function copy(readPath, writePath){
   console.log('readPath',readPath,'writePath',writePath);
   // 创建读取流
   const ReadStream = fs.createReadStream(readPath);
   // 创建写入流
   const WriteStream = fs.createWriteStream(writePath);
   ReadStream.pipe(WriteStream);
}





module.exports = {
    streamMergeRecursive,
    exitsFolder,
    exitsDirectory,
    mkdirSync,
    unlinkSync,
    renameSync,
    copy
}





