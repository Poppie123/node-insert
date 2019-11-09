var request = require('request');
var cheerio = require('cheerio');
var fs      = require('fs')

const startSplit = (reqUrl)=>{
    var titleHtml = ""
   request(reqUrl,function(err,response,){
       if (!err && response.statusCode == 200) {
          var resdata = JSON.parse(response.body);
          resdata.map((v)=>{
            titleHtml+= '标题： \n '+v.title+' \n';
          })
          var linstr = fs.readFileSync('input.txt');
          linstr = linstr.toString();
          fs.writeFileSync('input.txt',linstr+titleHtml)
          console.log('写入成功')
       }
   })
}
var num = 0 ;
var timp = setInterval(()=>{
    num +=20;
    if (num <=100) {
        startSplit('https://movie.douban.com/j/chart/top_list?type=5&interval_id=100%3A90&action=&start='+num+'&limit=20')
    }else{
        console.log('爬虫结束')
        clearImmediate(timp)
    }
},5000)
