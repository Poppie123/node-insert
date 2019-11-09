module.exports = {
    writeFile(filePath,data){
        var str = (fs.readFileSync(filePath)).toString();
        fs.writeFileSync(filePath,data+str)
    }
}
