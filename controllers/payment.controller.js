const Order = require("../models/Order");
const SSLCommerzPayment = require('sslcommerz')
const { v4: uuidv4 } = require('uuid');
const { createError } = require('../Utilities/error');



exports.initpayment = async (req, res, next) => {
    const { PayInfo } = req.body;
    // console.log("first",PayInfo);
    const productInfo = {
        total_amount: PayInfo.total,
        pay_info: PayInfo,
        currency: 'BDT',
        tran_id: uuidv4(),
        success_url: 'http://localhost:5000/api/v1/boikini/payment/success',
        fail_url: 'http://localhost:5000/api/v1/boikini/payment/fail',
        cancel_url: 'http://localhost:5000/api/v1/boikini/payment/cancel',
        ipn_url: 'http://yoursite.com/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'cust@yahoo.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
        multi_card_name: 'mastercard',
        value_a: 'ref001_A',
        value_b: 'ref002_B',
        value_c: 'ref003_C',
        value_d: 'ref004_D'
    };
    const newOrder = new Order({ ...productInfo.pay_info, tranId: productInfo.tran_id });
    // console.log("first",data)
    await newOrder.save();
    // console.log(data.pay_info);
    const sslcommer = new SSLCommerzPayment(process.env.STORE_ID, process.env.SSL_SECRET, false) //true for live default false for sandbox
    sslcommer.init(productInfo).then(data => {
        // console.log(data)
        const info = { ...productInfo, ...data }
        if (info.GatewayPageURL) {
            // console.log("hello");
            res.json(info.GatewayPageURL);

        } else {
            next(createError(400, "Payment Session Failed"));
        }
    });
}

// must add below two line in index.js or app.js for get post data
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
// app.use(bodyParser.json());

exports.successPayment = async (req, res, next) => {
    const newOrder = await Order.findOne({ tranId: req.body.tran_id });
    if (newOrder) {
        try {
            await Order.findByIdAndUpdate(newOrder._id, { $set: { valId: req.body.val_id, paymentMethod: req.body.card_issuer } });
            res.status(200).redirect(`http://localhost:3000/order-success`);
        } catch (error) {
            next(error)
        }
    }
}

exports.failPayment = async (req, res, next) => {
    const newOrder = await Order.findOne({ txtId: req.body.tran_id });
    if (newOrder) {
        try {
            await Order.findByIdAndDelete(newOrder._id);
            res.status(200).redirect(`http://localhost:3000/order-fail`);
        } catch (error) {
            next(error)
        }
    } else {
        res.status(200).redirect(`http://localhost:3000/`);
    }
}

exports.cancelPayment = async (req, res, next) => {
    const newOrder = await Order.findOne({ txtId: req.body.tran_id });
    if (newOrder) {
        try {
            await Order.findByIdAndDelete(newOrder._id);
            res.status(200).redirect(`http://localhost:3000/order-cancel`);
        } catch (error) {
            next(error)
        }
    } else {
        res.status(200).redirect(`http://localhost:3000/`);
    }
}