/*
 * @Description: untils ts
 * @Author: wuliang
 * @Date: 2019-08-21 08:15:55
 * @LastEditTime: 2019-08-21 09:12:11
 * @LastEditors: Please set LastEditors
 */
var fs  = require('fs');
module.exports = {
    /** 将String转为URI码  */
    endCode(str:string){
        return encodeURIComponent(str)
    },
    /** 将URI码转换String */
    deCode:function(str:string){
        return decodeURIComponent(str)
    },
    /** 
     * @name:持续写入文件
     * @param:filepath   文件路径
     * @param:data       需要写入的数据
     */
    continueFile:function(filePath:string,data:string){
        let str:string = fs.readFileSync(filePath);
        str = str.toString();
        fs.writeFileSync(filePath,str + data);
    }
}