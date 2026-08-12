require('dotenv').config()
const CartModel = require("../models/CartModel");
const OrderModel = require("../models/OrderModel");
const Razorpay = require('razorpay');
const crypto = require("crypto");
var RazorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_id,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

class OrderController {
    orderPlace(orderData) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    console.log(orderData);
                    const cartData = await CartModel.find({ user_id: orderData.user_id }).populate("product_id", "_id final_price main_img");
                    const productDetails = cartData.filter(cartItem => cartItem.product_id && cartItem.product_id.main_img) // filter valid items
                        .map(
                            (cartItem) => {
                                return {
                                    product_id: cartItem.product_id._id,
                                    qty: cartItem.qty,
                                    price: cartItem.product_id.final_price,
                                    total: cartItem.product_id.final_price * cartItem.qty,
                                    productName: cartItem.product_id.productName, // new
                                    main_img: cartItem.product_id.main_img,
                                }
                            }
                        )
                    // console.log(productDetails);

                    const order = await new OrderModel(
                        {
                            user_id: orderData.user_id,
                            product_details: productDetails,
                            order_total: orderData.order_total,
                            payment_mode: orderData.payment_mode,
                            shipping_details: orderData.shipping_details
                        }
                    )
                    order.save().then(
                        async (success) => {
                            if (success.payment_mode == 0) {
                                await CartModel.deleteMany({ user_id: orderData.user_id });

                                resolve(
                                    {
                                        msg: "Order Placed Successfully",
                                        status: 1,
                                        order_id: order._id
                                    }
                                )
                            }
                            else {
                                this.initialPaymentGateWay(order._id, orderData.order_total).then(
                                    (razorpay_order) => {
                                        resolve(
                                            {
                                                msg: "Order Place",
                                                status: 1,
                                                razorpay_order
                                            }
                                        )
                                    }
                                ).catch(
                                    () => {
                                        reject(
                                            {
                                                msg: "Order not Place",
                                                status: 0
                                            }
                                        )
                                    }
                                )
                            }
                        }
                    ).catch(
                        (error) => {
                            console.log(error)
                        }
                    )

                } catch (error) {
                    console.log(error);
                    reject(
                        {
                            msg: "Internal Server Error",
                            status: 0
                        }
                    )
                }

            }
        )
    }

    initialPaymentGateWay(order_id, order_total) {
        return new Promise(
            (resolve, reject) => {
                try {
                    var options = {
                        amount: order_total * 100,
                        currency: "INR",
                        receipt: order_id
                    };
                    RazorpayInstance.orders.create(options, async function (err, razorpay_order) {
                        if (err) {
                            reject(
                                {
                                    msg: "InitialPaymentGateWay Error",
                                    status: 0
                                }
                            )
                        } else {
                            await OrderModel.updateOne(
                                {
                                    _id: order_id
                                },
                                {
                                    razorpay_order_id: razorpay_order.id
                                }
                            )
                            resolve(
                                {
                                    msg: "Order Created",
                                    status: 1,
                                    order_id,
                                    razorpay_order: razorpay_order.id
                                }
                            )
                        }
                        console.log(razorpay_order);
                    });
                } catch (error) {
                    reject(
                        {
                            msg: "Internal server error",
                            status: 0
                        }
                    )
                }
            }
        )
    }

    async paymentSuccess(order_data) {
        return new Promise(async (resolve, reject) => {
            try {
                const { order_id, user_id, razorpay_response } = order_data;

                const data = `${razorpay_response.razorpay_order_id}|${razorpay_response.razorpay_payment_id}`;

                const generatedSignature = crypto
                    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                    .update(data)
                    .digest('hex');

                if (generatedSignature === razorpay_response.razorpay_signature) {
                    await CartModel.deleteMany({ user_id });

                    await OrderModel.updateOne(
                        {
                            razorpay_order_id: razorpay_response.razorpay_order_id
                        },
                        {
                            razorpay_payment_id: razorpay_response.razorpay_payment_id,
                            order_status: 1
                        }
                    );

                    resolve({ status: 1, msg: "Order Placed" });
                } else {
                    reject({ status: 0, msg: "Payment verification failed" });
                }
            }
            catch (error) {
                console.log(error);
                reject({ status: 0, msg: "Internal Server Error" });
            }
        });
    }



}
module.exports = OrderController;