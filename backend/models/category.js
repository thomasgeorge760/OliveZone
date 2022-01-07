const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        uppercase: true,
        unique: true,
        required: [true, 'enter category name'],
        trim: true,
        maxLength: [50, 'category name cannot exceed 50 char']
    },
    subCategories: [
        {
            name: {
                type: String,
                uppercase: true,
                required: [true, 'enter Subcategory name'],
                trim: true,
                maxLength: [50, 'Sub-category name cannot exceed 50 char']
            },
            offerPercentage: {
                type: Number,
                default: 0.0
            },
            offerDetails: {
                type: String
            },
            createdAt: {
                type: Date,
                default: Date.now()
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

module.exports = mongoose.model('category', categorySchema)


