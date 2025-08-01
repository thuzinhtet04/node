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
})
server.listen(PORT , () => console.log(`server running on port ${PORT}`))
//initialize obj
// const Emitter = new MyEmitter();
//
// Emitter.on('log' , (msg) => logEvents(msg)
// )
