const express = require('express');
const { processPayment, sendStripeApi } = require('../controllers/paymentController');
const { isAuthenticatedUser } = require('../middlewares/auth');
const router = express.Router();

router.route('/payment/process').post(isAuthenticatedUser, processPayment);
router.route('/stripe/api').get(isAuthenticatedUser, sendStripeApi);

module.exports = router;