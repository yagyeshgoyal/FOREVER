const express = require('express');

const {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus} = require('../controllers/orderController');
const adminAuth = require('../middleware/adminAuth');
const authUser = require('../middleware/auth')
const orderRouter = express.Router();


//admin features
orderRouter.post('/list',adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

// payment methods
orderRouter.post('/place', authUser,placeOrder);
orderRouter.post('/stripe', authUser,placeOrderStripe);
orderRouter.post('/razorpay', authUser,placeOrderRazorpay);

// user Feature
orderRouter.post('/userorders', authUser, userOrders)

module.exports = orderRouter;