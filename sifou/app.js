var request = require('request');
var cheerio = require('cheerio');
var Entities = require('html-entities').XmlEntities; //decode转码
entities = new Entities();
let listarr = [];                 //存放爬取到的文章数据
const startInsect = (url) => {
    request(url,(err,response,body)=>{
        if (!err && response.statusCode == 200) {
            let $ = cheerio.load(body);
            $('.news__item-title').each(function(){
                listarr.push({
                    title:$(this)[0].children[0].data
                })
            })
            $('.article-excerpt').each(function(i){
                var erTitle  = $(this)[0].children[0].data;
                erTitle = erTitle.trim()
                listarr[i].erTitle = erTitle;
            })
            $('.news__item-info').each(function(i){
               listarr[i].href = 'https://segmentfault.com'+$(this).find('a')[0].attribs.href;
            })
            listarr.map((v)=>{
                getAtrDetail(v)
            })
        }
    })
}
const getAtrDetail = (obj) => {
    request(obj.href,function(err,response,body){
        if (!err && response.statusCode == 200) {
            let $ = cheerio.load(body);
            var html = $('.article__content').html();
            //html = entities.decode(html)
            saveSql(obj.title,3,html,1,obj.erTitle,"","")
        }
    })
}
const saveSql = (atricle_names,regions = 1,contents,watchs,atricle_titles,dates,img_srcs) => {
    let atricle_name = atricle_names;  //文章名字
    let region       = regions || 2;   //文章类型1是博客 2是慕课网 3是思否
    let content      = contents || ""; //文章富文本内容
    let watch        = watchs || 1;    //是否可以看
    let atricle_title= atricle_titles || "";//文章副标题
    let date         = dates || (new Date()).Format("yyyy-MM-dd hh:mm:ss");               //日期
    let img_src      = img_srcs || "";            //文章介绍图
    request({
        url:"http://localhost:8088/addAtricle",
        //url:"http://wu-admin-server.wuliang666.com/addAtricle",
        method:'post',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({
            atricle_name:atricle_name,
            region:region,
            content:content,
            watch:watch,
            atricle_title:atricle_title,
            date:date,
            img_src:img_src,
        })
    },(err,response,body) => {
        if (!err && response.statusCode == 200) {
            console.log('写入数据库成功')
        }else{
            console.log(err)
        }
    })
}
//getAtrDetail('https://segmentfault.com/a/1190000020169229')
startInsect('https://segmentfault.com/channel/frontend')
Date.prototype.Format = function(fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}