const mongoose = require('mongoose')


const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
    }).then(connect => {
        console.log(`MongoDB connected with HOST: ${connect.connection.host}`)
    })
}

module.exports = connectDatabase