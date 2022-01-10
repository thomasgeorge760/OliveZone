const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const userSchema  = new mongoose.Schema({
    name: {
        type: 'string',
        required: [true, 'please enter your name'],
        maxLength: [30, 'your name cannot exceed 30 char']
    },
    email: {
        type: 'string',
        required: [true, 'please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'please enter a vlaid email address']
    },
    password: {
        type: 'string',
        required: [true, 'please enter your password'],
        minLength: [6, 'your password must be at least 6 characters'],
        select: false
    },
    address: {
        type: 'string'
    },
    avatar: {
        public_id: {
            type: 'string',
            required: true
        },
        url: {
            type: 'string',
            required: true
        }
    },
    role: {
        type: 'string',
        default: 'user'
    },
    isBlocked: {
        type: 'boolean',
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

// encrypting password before saving

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})

//Return JWT token

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRATION_TIME
    })
}

//compare user password

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}

//generate password reset token
userSchema.methods.getResetToken = function () {
    //generating token
    const resetToken = crypto.randomBytes(20).toString('hex');

    //hast and set to resetToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    //setting token expiring time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

    return resetToken
}

module.exports = mongoose.model('user', userSchema);