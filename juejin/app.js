var until = require('../until/index.js');
var fs    = require('fs');
var cheerio = require('cheerio');
var request = require('request');
const startSplider = (target) =>{
    request({
        url:target,
        method:'POST',
        headers:{
            'content-type':'application/json',
        },
        body:JSON.stringify({
           extensions:{
               query:{
                   id:'21207e9ddb1de777adeaca7a2fb38030',
               },
               operationName:"",
               query:""
            },
            variables:{
                after:"",
                first:20,
                order:"popular"
            }
        },function(err,response,body){
            console.log(response)
            if (response.statusCode == 200) {
                console.log(body)
            }
        })
    })
}
//startSplider('https://web-api.juejin.im/query')
var page = 1;
var arr = [1,23,4,5,6,7,7,12,33,56,90]
console.log(arr.splice((page * 10 )-10,10))