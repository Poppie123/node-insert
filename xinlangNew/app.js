var request = require('request');
var cheerio = require('cheerio');
var fs      = require('fs')
const startSplit = (reqUrl,numPage)=>{
    var reqqUrl = 'http://interface.sina.cn/auto/inner/getAutoSubpageInfo.d.json?cid=78593&pageSize=15&page='+numPage
    var titleHtml = ""
   request(reqUrl,function(err,response,body){
       setTimeout(function(){
            if (!err && response.statusCode == 200) {
                var $ = cheerio.load(body);
                request(reqqUrl,function(err,response,body){
                    if (!err && response.statusCode == 200) {
                        var dt = JSON.parse(response.body);
                        $('.content').html(dt.data)
                        var list = $('.con .s-left h3 a');
                        for (let i = 0; i < list.length; i++) {
                            titleHtml+= "title :"+list[i].children[0].data+" \n";
                        }
                        writeFile('xinlang.txt',titleHtml+" \n \n")
                    }
                    
                })
            }
       },2000)
   })
}
var num = 2 ;
var timp = setInterval(()=>{
    num +=1;
    if (num <8) {
        startSplit('http://auto.sina.com.cn/newcar/?page=3',num)
    }else{
        console.log('爬虫结束')
        clearInterval(timp)
    }
},3000)
function writeFile(filePath,data){
    var str = "";
    str = (fs.readFileSync(filePath)).toString();
    fs.writeFileSync(filePath,data+str)
    console.log('文件写入完成')
}
