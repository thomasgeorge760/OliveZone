const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const Razorpay = require('razorpay')
const shortid = require('shortid');


/* -------------------------------------------------------------------------- */
/*             process stripe payments => /api/v1/payment/process             */
/* -------------------------------------------------------------------------- */
exports.processPayment = catchAsyncErrors( async (req, res, next) => {

    const paymentIntent = await stripe.paymentIntent.create({
        amount: req.body.amount,
        currency: 'inr',

        metadata: {
            integration_check: 'accept_a_payment'
        }
    })

    res.status(200).json({
        success: true,
        client_Secret: paymentIntent.client_Secret
    })
})

/* -------------------------------------------------------------------------- */
/*                  send stripe api key => /api/v1/stripeapi                  */
/* -------------------------------------------------------------------------- */
exports.sendStripeApi = catchAsyncErrors( async (req, res, next) => {

    res.status(200).json({
        success: true,
        stripeApiKey: process.env.STRIPE_API_KEY
    })
})

/* -------------------------------------------------------------------------- */
/*                          process cash on delivery                          */
/* -------------------------------------------------------------------------- */



/* -------------------------------------------------------------------------- */
/*                                  razorpay                                  */
/* -------------------------------------------------------------------------- */

var instance = new Razorpay({
    key_id: 'rzp_test_toTgvsLqs5fQjG',
    key_secret: 'f4yxJ2q5uQgbRxYAe38pnKg2'
})

exports.razorpay = catchAsyncErrors( async(req, res, next) => {
    const payment_capture = 1;
    const options = {
        amount: (req.body.totalPrice*100).toFixed(0),
        currency: 'INR',
        receipt: shortid.generate(),
        payment_capture,
        // notes
    }
    
    const response = await instance.orders.create(options)
    console.log(response)
    res.json({
        id: response.id,
        currency: 'INR',
        amount: response.amount
    })
})



/* -------------------------------------------------------------------------- */
/*                          verification of razorpay                          */
/* -------------------------------------------------------------------------- */
exports.verification = catchAsyncErrors( async (req, res, next) => {
   
    console.log('verification ethi')
   
    //do a validation

    const SECRET = 'kokkachiisdangerous'

    console.log(req.body)


    res.json({
        status: 'ok'
    })
})