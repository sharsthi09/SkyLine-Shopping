const mongoose = require("mongoose");


const ProductSchema=mongoose.Schema(
    {
        productName:{
            type:String,
            maxlength:200,
            unique:true
        },
        productSlug:{
            type:String,
            maxlength:200,
            unique:true
        },
        short_description: {
            type: String,
            maxlength:500
        },
        long_description: {
            type: String
        },
        original_price: {
            type: Number,
            default: 1
        },
        discount_percentage: {
            type: Number,
            default: 0
        },
        final_price: {
            type: Number,
            default: 1
        },
        category_id: {
            type: mongoose.Schema.ObjectId,
            ref: "category"
        },
        colors: [{
            type: mongoose.Schema.ObjectId,
            ref: "color"
        }],
        main_img: {
            type: String,
            default: null
        },
        other_img: [
            {
                type: String
            }
        ],
        stock: {
            type: Boolean,
            default: true
        },
        top_selling: {
            type: Boolean,
            default: false 
        },
        status: {
            type: Boolean,
            default: true
        }
    },{
        timestamps:true
    }
)

const ProductModel=mongoose.model("product",ProductSchema);
module.exports=ProductModel;