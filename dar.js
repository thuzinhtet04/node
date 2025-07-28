const fs = require('fs')

if (!fs.existsSync('./new')){        //check dir is already exist or not

fs.mkdir('./new' , (err) => {   //make new dir
    if (err) throw  err;
    console.log('dir created successfully')
})
}

if (fs.existsSync('./new')){        //check dir is already exist or not

    fs.rmdir('./new' , (err) => {   //delete new dir
        if (err) throw  err;
        console.log('dir remove successfully')
    })
}

