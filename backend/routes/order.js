const express = require('express');
const { newOrder, myOrders, getSingleOrder, allOrders, updateOrder, deleteOrder, filterOrders, lastWeekSales } = require('../controllers/orderController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const router = express.Router();

router.route('/order/new').post(isAuthenticatedUser, newOrder);

router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/orders/me').get(isAuthenticatedUser, myOrders);

router.route('/admin/orders/').get(isAuthenticatedUser, authorizeRoles('admin'), allOrders);
router.route('/admin/order/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);

router.route('/admin/orders/sort').get(isAuthenticatedUser, authorizeRoles('admin'),filterOrders)
router.route('/admin/orders/lastweek').get(isAuthenticatedUser, authorizeRoles('admin'),lastWeekSales)

module.exports = router;