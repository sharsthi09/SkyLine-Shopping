const mongoose=require('mongoose');

const CategorySchema=mongoose.Schema(
    {
        categoryname:{
            type:String,
            required:true,
            unique:true
        },
        categoryslug:{
            type:String,
            required:true,
            unique:true
        },
        categoryimage:{
            type:String,
            default:null
        },
        categorystatus:{
            type:Boolean,
            default:true
        }
    },{
        timestamps:true
    }
)

const CategoryModel=mongoose.model("category",CategorySchema);
module.exports=CategoryModel;