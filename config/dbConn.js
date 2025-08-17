const moogoose = require('mongoose')

const connectDB = async () => {
    try {
        await moogoose.connect(process.env.DATABASE_URI , {
            useUnifiedTopology : true,
            useNewUrlParser : true,
        });
    } catch (error) {
        console.error(error)
    }
}
module.exports = connectDB;