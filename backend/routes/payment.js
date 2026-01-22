const express = require('express');
const { createRazorpayOrder } = require('../handlers/payment-handler');

const router = express.Router();

router.post('/create-order', createRazorpayOrder);

module.exports = router;