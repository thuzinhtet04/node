const logEvents = require('./logEvents')
const EventEmitter = require('events');
const http = require('http')
const fs = require('fs')
const path = require('path')
const fsPromises = require('fs').promises;
class  MyEmitter extends  EventEmitter{
}
// initialize obj
const Emitter = new MyEmitter();
Emitter.on('log' , (msg , fileName) => logEvents(msg , fileName
    )
)
const PORT = process.env.PORT || 3500;

const serveFile = async (filePath , contentType , response) => {
   try{
const rawData = await  fsPromises.readFile(filePath , !contentType.includes('image') ? 'utf8' : '')
     const data = contentType === 'application/json' ? JSON.parse(rawData) : rawData;
      response.writeHead(
          filePath.includes('404.html') ? 404 :
          200 , {'Content-Type' : contentType});
      response.end(
          contentType === 'application/json' ? JSON.stringify(data) : data
      )
   }catch (err){
      console.error(err)
      Emitter.emit('log' , `${err.name} : ${err.message}` , 'errLog.txt')
      response.statusCode = 500;
      response.end();
   }
}

const server = http.createServer((req  , res) => {

   console.log(req.url , req.method)
   Emitter.emit('log' , `${req.url} \t ${req.method}` , 'reqLog.txt')
   const extension = path.extname(req.url)

   console.log(extension)

   let contentType;
   switch (extension){
      case '.css' :
         contentType = 'text/css';
         break;
      case '.js' :
         contentType = 'text/javascript';
         break;
      case '.json' :
         contentType = 'application/json';
         break;
      case '.jpg' :
         contentType = 'image/jpeg';
         break;
      case '.png' :
         contentType = 'image/png';
         break;
      case '.txt' :
         contentType = 'text/plain';
         break;
      default :
         contentType = 'text/html';
         break;


   }
 let filePath =
     contentType === 'text/html' && req.url === '/'
         ? path.join(__dirname , 'views' , 'index.html')
         : contentType === 'text/html' && req.url.slice(-1) === '/'
             ? path.join(__dirname  , 'views' , req.url , 'index.html' )
             : contentType === 'text/html'
                 ? path.join(__dirname , 'views' , req.url)
                 : path.join(__dirname , req.url)
// make .html extension not required in the browser
if (!extension && req.url.slice(-1) !== '/'){
   filePath += '.html'
}
 const fileExitsts = fs.existsSync(filePath);
console.log(filePath , 'filepath' , contentType , 'contentType' , extension , 'extension')
if (fileExitsts) {
   //server file
serveFile(filePath , contentType , res);
}else{
   switch (path.parse(filePath).base){
      case 'old-page.html' :
         res.writeHead(301 , {'Location' : '/new-page.html' });
         res.end();
         break;
      case 'www-page.html' :
         res.writeHead(301 , {'Location' : '/' });
         res.end();
         break;
      default :
         //serve 404 response
         serveFile( path.join(__dirname , 'views' , '404.html' ) , 'text.html' , res);
         break;
   }


}
});
server.listen(PORT , () => console.log(`server running on port ${PORT}`))




