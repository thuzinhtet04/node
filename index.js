const logEvents = require('./logEvents')
const EventEmitter = require('events')
class  MyEmitter extends  EventEmitter{

}
//initialize obj
const myEmitter = new MyEmitter();

myEmitter.on('log' , (msg) => logEvents(msg)
)
setTimeout(()=> {
    //emit event
    myEmitter.emit('log' , 'heo this is emit message')
} ,1000 )