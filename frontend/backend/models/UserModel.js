const mongoose = require('mongoose');

const ShippingAddressSchema = new mongoose.Schema(
    {
        addressLine1:{type: String, required:true},
        addressLine2:{type: String, required:false},
        city:{type: String, required:true},
        state:{type: String, required:true},
        postalCode:{type: String, required:true},
        country:{type: String, required:true}
    },
    {_id:false}
);

const userSchema= new mongoose.Schema(
    {
        name:{
            type:String,
            trim: true
        },
        email:{
            type:String,
            required:[true,"Email is required"],
            unique:true,
            trim:true
        },
        contact:{
            type:String,
            default:null
        },
        password:{
            type:String,
            required:[true,"Password is required"],
            minlength:[7,"Password must be at least 6 characters long"]
        },
        shipping_address:{
            type:[ShippingAddressSchema],
            default:[]
        }
    },{
        timestamps: true
    }
)

const UserModel=mongoose.model("user",userSchema);
module.exports=UserModel;