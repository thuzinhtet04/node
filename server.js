console.log("hello world");
const os = require('os');
const path = require('path');
console.log(os.type());
console.log(os.version());
console.log(os.homedir());
console.log(__dirname , 'dirname of current file');
console.log(__filename,'file name of current file');
console.log(path.dirname(__filename) , "dirname for filename")
console.log(path.basename(__filename) , 'basename of file')
console.log(path.extname(__filename) , 'extension of file')
console.log(path.parse(__filename) , 'data object for file')