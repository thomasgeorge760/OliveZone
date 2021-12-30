const app = require('./app')
const connectDatabase = require('./config/database')

const dotenv = require('dotenv');

const cloudinary = require('cloudinary')


//handling uncaught exceptions

process.on('uncaughtException', err => {
    console.log(`Error : ${err.message}`)
    console.log('shutting down server because of uncaught exceptions')
    console.log(`Error stack: ${err.stack}`)

    process.exit(1)

})

//setting up config

dotenv.config({ path: 'backend/config/config.env' })


//connect to database
connectDatabase();

/* -------------------------------------------------------------------------- */
/*                     setting up cloudinary configuration                    */
/* -------------------------------------------------------------------------- */
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})


const server = app.listen(process.env.PORT, () => {
    console.log(`Server started at PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

//Handle unhandled promise rejections

process.on('unhandledRejection', err => {
    console.log(`Error: ${err.stack}`)
    console.log('shutting down server because of unhandled promise rejections')
    server.close(() => {
        process.exit(1)
    })
})