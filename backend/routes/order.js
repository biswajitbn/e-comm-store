const express = require('express');
const {
  placeOrder,
  getMyOrders,
  getOrderById,
} = require('../handlers/order-handler');

const { verifyToken } = require('../middleware/auth-middleware');

const router = express.Router();

// 👇 Protect all routes with verifyToken
router.post('/', verifyToken, placeOrder);
router.get('/my', verifyToken, getMyOrders);
router.get('/:id', verifyToken, getOrderById);

module.exports = router;
