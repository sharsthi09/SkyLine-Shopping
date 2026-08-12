const mongoose=require('mongoose');

const AdminSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
        },
        phone:{
            type:Number,
            required:true,
            unique:true
        },
        role:{
            type:Boolean,
            default:false
        }
    }
    ,{
        timestamps:true
    }
)

const AdminModel=mongoose.model("admin",AdminSchema);
module.exports= AdminModel;