const logEvents = require('./logEvents')
const EventEmitter = require('events');
const http = require('http')
const fs = require('fs')
const path = require('path')
const fsPromises = require('fs').promises;
class  MyEmitter extends  EventEmitter{
}

const PORT = process.env.PORT || 3500;

const server = http.createServer((req  , res) => {

   console.log(req.url , req.method)
   let filePath;
   switch (req.url){
      case '/' :
         res.statusCode = 200;
      filePath = path.join(__dirname , 'view' , 'index.html');
      console.log(filePath , 'filepaht')
      fs.readFile(filePath , 'utf8' , (err , data)=> {
         console.log(data , 'data')
         // if (err) throw err;
         res.end(data);
      });
      break;
   }

})
server.listen(PORT , () => console.log(`server running on port ${PORT}`))



//initialize obj
// const Emitter = new MyEmitter();
//
// Emitter.on('log' , (msg) => logEvents(msg)
// )
