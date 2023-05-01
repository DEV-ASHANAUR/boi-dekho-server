const express = require('express');
const { initpayment, successPayment, failPayment, cancelPayment } = require('../controllers/payment.controller');


const router = express.Router();

router.post("/init",initpayment);
router.post("/success",successPayment);
router.post("/fail",failPayment);
router.post("/cancel",cancelPayment);

module.exports = router;
