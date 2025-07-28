const fsPromises = require('fs').promises;
const path = require('path');

const fileOps = async  () => {
    try{
        const data = await  fsPromises.readFile(path.join(__dirname , 'files' , 'short.txt') , 'utf-8')
        console.log(data)
   await  fsPromises.unlink(path.join(__dirname , 'files' , 'short.txt'))
        await  fsPromises.writeFile(path.join(__dirname , 'files' ,
            'promiseWrite.txt'), data)
        await  fsPromises.appendFile(path.join(__dirname , 'files' ,
            'promiseWrite.txt'), '\n\nNice to meet you too')
        await  fsPromises.rename(path.join(__dirname , 'files' ,
            'promiseWrite.txt'), path.join(__dirname , 'files' , 'promiseRename.txt'))

        const newData = await  fsPromises.readFile(path.join(__dirname , 'files' , 'promiseRename.txt') , 'utf-8')
        console.log(newData)
    }catch (err){
       console.error(err)
    }
};
fileOps();

// fs.readFile(path.join(__dirname , 'files' , 'short.txt') , 'utf8' , (err, data) => {
//     if (err) throw err;
//     console.log(data)
// })
console.log('end')

// fs.writeFile(path.join(__dirname , 'files' , 'write.txt') , 'nice to meet you' , (err, data) => {
//     if (err) throw err;
//     console.log('write complete')
//     fs.appendFile(path.join(__dirname , 'files' , 'write.txt') , '\n nice to meet you too' , (err, data) => {
//         if (err) throw err;
//         console.log('append complete')
//         fs.rename(path.join(__dirname , 'files' , 'write.txt') , path.join(__dirname , 'files' , 'rename.txt') , (err, data) => {
//             if (err) throw err;
//             console.log('rename complete')
//         })
//     })
//
// })
