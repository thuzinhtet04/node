const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname , 'files' , 'short.txt') , 'utf8' , (err, data) => {
    if (err) throw err;
    console.log(data)
})
console.log('end')

fs.writeFile(path.join(__dirname , 'files' , 'write.txt') , 'nice to meet you' , (err, data) => {
    if (err) throw err;
    console.log('write complete')
    fs.appendFile(path.join(__dirname , 'files' , 'write.txt') , '\n nice to meet you too' , (err, data) => {
        if (err) throw err;
        console.log('append complete')
        fs.rename(path.join(__dirname , 'files' , 'write.txt') , path.join(__dirname , 'files' , 'rename.txt') , (err, data) => {
            if (err) throw err;
            console.log('rename complete')
        })
    })

})
