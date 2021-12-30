const Product = require('../models/product')
const dotenv = require('dotenv')
const connectDatabase = require('../config/database')

const products = require('../data/product')

//setting database
dotenv.config({path: 'backend/config/config.env'})

connectDatabase();

const seedProducts = async () => {
    try {

        await Product.deleteMany();
        console.log('Products deleted successfully')
        
        await Product.insertMany(products)
        console.log('Products inserted successfully')

        process.exit()

    } catch(error) {
        console.log(error.message);
        process.exit()
    }
}

seedProducts()