const mongoose = require('mongoose');
const {Schema} =mongoose;

const productDetailsSchema = new Schema({
    product_id:{type:Schema.Types.ObjectId,ref:'product',required:true},
    productName: String,
    main_img: String,
    qty:{type:Number,required:true},
    price:{type:Number,required:true},
    total:{type:Number,required:true},
},{_id: false});

const shippingDetailsSchema = new Schema({
    name:{type:String},
    contact:{type:String},
    addressLine1:{type:String,required:true},
    addressLine2:{type:String},
    city:{type:String,required:true},
    state:{type:String,required:true},
    postalCode:{type:String,required:true},
    country:{type:String,required:true}
},{_id: false});

const orderSchema = new Schema({
    user_id:{type:Schema.Types.ObjectId,ref:'user',required:true},
    product_details:{type:[productDetailsSchema],required:true},
    order_total:{type:Number,required:true},
    payment_mode:{type:Boolean,required:true},
    razorpay_order_id:{type:String,default:null},
    razorpay_payment_id:{type:String,default:null},
    order_status:{
        type:Number,
        enum:[0,1,2,3,4,5,6,7],
        default:0
    },
    shipping_details:{type: shippingDetailsSchema, required:true}
},{timestamps: true});

const OrderModel =mongoose.model('Order',orderSchema);
module.exports =OrderModel;

