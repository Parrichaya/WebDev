const Razorpay = require("razorpay");
const Order = require("../models/order");
require('dotenv').config();

exports.purchasepremium = (req, res, next) => {
    var rzp = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    })
    const amount = 2500;

    rzp.orders.create({amount: amount, currency: "INR"})
    .then((order) => {
        req.user.createOrder({
            orderid: order.id,
            status: 'PENDING'
        })
        .then(() => {
            res.status(201).json({
                order,
                key_id: rzp.key_id
            })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

// exports.updateTransactionStatus = (req, res, next) => {
//     const orderId = req.body.order_id;
//     const paymentId = req.body.payment_id;
//     const error = req.body.error;

//     if(error) {
//         Order.findOne({where: {orderid: orderId}})
//         .then(order => {
//             order.update({status: 'FAILED'})
//             .then(() => {
//                 return res.status(202).json({
//                     status: 'success',
//                     message: 'Payment Failed!'
//                 })
//             })
//             .catch(err => console.log(err))
//         })
//         .catch(err => console.log(err))
//     } else {
//         Order.findOne({where: {orderid: orderId}})
//         .then(order => {
//             order.update({paymentid: paymentId, status: 'SUCCESSFUL'})
//             .then(() => {
//                 req.user.update({ispremiumuser: true})
//                 .then(() => {
//                     return res.status(202).json({
//                         status: 'success',
//                         message: 'Payment Successful!'
//                     })            
//                 })
//                 .catch(err => console.log(err))
//             })
//             .catch(err => console.log(err))
//         })
//         .catch(err => console.log(err))
//         }
//     }

exports.updateTransactionStatus = async (req, res, next) => {
    const { order_id, payment_id, error } = req.body;
    if(error) {
        const order = await Order.findOne({ where: { orderid: order_id } });
        const orderUpdatePromise = order.update({ paymentid: payment_id, status: 'FAILED' });
        const userUpdatePromise = req.user.update({ ispremiumuser: false });

        Promise.all([orderUpdatePromise, userUpdatePromise])
        .then(() => {
            return res.status(202).json({ status: 'success', message: 'Payment Failed!' });
        })
        .catch(err => console.error(err));
    } else {
        const order = await Order.findOne({ where: { orderid: order_id } });
        const orderUpdatePromise = order.update({ paymentid: payment_id, status: 'SUCCESSFUL' });
        const userUpdatePromise = req.user.update({ ispremiumuser: true });

        Promise.all([orderUpdatePromise, userUpdatePromise])
        .then(() => {
            return res.status(202).json({ status: 'success', message: 'Payment Successful!' });
        })
    }
}