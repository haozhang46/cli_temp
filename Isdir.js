const fs  = require('fs')
const isDIr = (fileAddress)=>{
    let isdir = false
    try{
        console.log('fileAddress',fileAddress)
        var stat = fs.lstatSync(fileAddress);
         isdir = stat.isDirectory()
        console.log('==isdir==',isdir)
    }catch(e){
        isdir = false
    }
 
    return isdir
}

module.exports = isDIr