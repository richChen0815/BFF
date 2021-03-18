var express = require("express");
var app = new express();
const request = require("supertest");
const expect = require("chai").expect;

const {config} = require("../config")
//配置config
console.log("config.originUrl",config.originUrl,'config.originUrl/xx',config.originUrl+'/api/cattleInfo','config.localUrl',config.localUrl+'/api/cattleInfo');

describe("接口测试",function(){
    it('🐮列表查询',function(done){
        //ECONNREFUSED: Connection refused
       /* request(app)
        .get(config.localUrl+'/api/cattleInfo')
        .expect(200)
        .end(function(err,res){
            console.log('err',err,"res",res)
            expect(res.body.result.length);
            //异步不许要done
            done();
        });*/

        request(config.localUrl)
        .get('/api/cattleInfo')
        .expect(200)
        .end(function(err,res){
           // console.log(res.body.result);
           expect(res.body.result.length).length;
           done();
        }) ;  
    });
})









