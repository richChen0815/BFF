# BFF


## node commonjs ---> es module

    @babel/node @babel/core @babel/cli @babel/preset-env 

    step1   .babelrc
    step2   运行脚本之前 需要编译     nodemon  --exec babel-node xxx.js
    注意:这里不是编程成另外的文件


## 接口测试是为了将来上线前做回归用的。省去手动点击，节省更多的时间


## webpack bff 系列

    -- scripty 管理package 命令行

        背景: npm script 在复杂情况下，可读性价差。
        需求：希望有一个库单独剥离script 每一项，方便管理。思路也会比较清晰。

        script:{
            "server:dev":"scripty"
        }

        新建 scripts 文件夹 创建shell 文件脚本
        server:dev
        scripts --> server --> dev.sh

    -- 问题
        scripty WARN Ignoring script '/Users/xiaoquan/Desktop/BFF/scripts/server/start.sh' because it was not readable/executable.
        scripty WARN Run `chmod u+rx '/Users/xiaoquan/Desktop/BFF/scripts/server/start.sh'` if you want scripty to run it.


        linux 下 赋予shell 读写权限


## 文件分类  client 用户端   server 服务端

    views   public   虽然涉及到后台功能。 但是产物是前端的东西。
    如果将来项目实是在同一个工程目录下，那么上传图片路径可以在client中。
    如果将来要分离client 和 server  上传写入图片路径 需要写到server 文件夹中。


## 开始client webpack 抒写



## gulp  
    编译node工程

    使用gulp能不能不改变文件的引用。只改文字，输出到目录下面
    解决: 可以不写文件名

    gulp-rename:https://blog.csdn.net/guang_s/article/details/84861940


## plugin 手写

    