const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

//check if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors( async( req, res, next ) => {

    const token = req.cookies.token;

    if(!token) {
        return next( new ErrorHandler('Login first to access', 401))
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decoded.id)

    next()

})

// handling user roles

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {

            return next( new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`, 403));
        }
        next();
    }
}