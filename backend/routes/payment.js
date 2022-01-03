const express = require('express');
const { processPayment, sendStripeApi, razorpay, verification } = require('../controllers/paymentController');
const { isAuthenticatedUser } = require('../middlewares/auth');
const router = express.Router();

router.route('/payment/process').post(isAuthenticatedUser, processPayment);
router.route('/stripe/api').get(isAuthenticatedUser, sendStripeApi);
router.route('/razorpay').post(isAuthenticatedUser,razorpay)

router.route('/verification').post(isAuthenticatedUser, verification)

module.exports = router;