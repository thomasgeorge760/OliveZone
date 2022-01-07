const Order = require('../models/order')
const Product = require('../models/product')

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

/* -------------------------------------------------------------------------- */
/*                    create new order => /api/v1/order/new                   */
/* -------------------------------------------------------------------------- */
exports.newOrder = catchAsyncErrors( async(req, res, next) => {

    const {
        orderItems,
        shippingInfo,
        itemsPricee,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    const user = {
        userId: req.user._id,
        name: req.user.name,
        email: req.user.email
    }

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPricee,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user
    })

    res.status(200).json({
        success: true,
        order
    })
})

/* -------------------------------------------------------------------------- */
/*                    get single order => /api/v1/order/:id                   */
/* -------------------------------------------------------------------------- */
exports.getSingleOrder = catchAsyncErrors( async(req,res,next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name');

    if(!order) {
        return next(new ErrorHandler('No order found with this id', 404));
        
    }

    res.status(200).json({
        success: true,
        order
    })
})

/* -------------------------------------------------------------------------- */
/*                    get logged in user order => /api/v1/orders/me                   */
/* -------------------------------------------------------------------------- */
exports.myOrders = catchAsyncErrors( async(req,res,next) => {
    const orders = await Order.find({user: req.user.id});

    // if(!orders) {
    //     return next(new ErrorHandler('No orders found for this user', 404));
        
    // }

    res.status(200).json({
        success: true,
        orders
    })
})

/* -------------------------------------------------------------------------- */
/*                    get all orders - admin => /api/v1/admin/orders/                   */
/* -------------------------------------------------------------------------- */
exports.allOrders = catchAsyncErrors( async(req,res,next) => {
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

/* -------------------------------------------------------------------------- */
/*                  update /process orders - admin => /api/v1/admin/order/:id */
/* -------------------------------------------------------------------------- */
exports.updateOrder = catchAsyncErrors( async(req,res,next) => {
    const order = await Order.findById(req.params.id);

    if(order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('you have already delivered this order', 400));
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status
    order.deliveredAt = Date.now()

    await order.save()

    res.status(200).json({
        success: true,
        order
    })
})

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock = product.stock - quantity;

    await product.save({validateBeforeSave: false});
}

/* -------------------------------------------------------------------------- */
/*                    delete order => /api/v1/admin/order/:id                   */
/* -------------------------------------------------------------------------- */
exports.deleteOrder = catchAsyncErrors( async(req,res,next) => {
    
    const order = await Order.findById(req.params.id)
   
    if(!order) {
        return next(new ErrorHandler('No order found with this id', 404));
        
    }
    
    await order.remove()

    res.status(200).json({
        success: true
    })
})