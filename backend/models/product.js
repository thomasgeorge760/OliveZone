const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'enter product name'],
        trim: true,
        maxLength: [100, 'product name cannot exceed 100 char']
    },
    price: {
        type: Number,
        required: [true, 'enter product price'],
        default: 0.0,
        maxLength: [5, 'product name cannot exceed 5 char']
    },
    description: {
        type: String,
        required: [true, 'enter product description'],
        
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'enter product category'],
        enum: {
            values: [
                'Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/shoes',
                'Beauty/health',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message: 'please select correct category for product'
        }
    },
    seller: {
        type: String,
        required: [true, 'enter product seller']
    },
    stock: {
        type: Number,
        required: [true, 'enter product stock'],
        maxLength: [5, 'product name cannot exceed 5 char'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('product', productSchema)