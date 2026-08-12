const ColorModel = require("../models/ColorModel");

class ColorController{
    create(data){
        return new Promise(
            (resolve,reject)=>{
                try {
                    const color=new ColorModel(
                        {
                            ...data    
                        }
                    )
                    color.save().then(
                        (success)=>{
                            resolve(
                                {
                                    msg:"Color Created",
                                    status:1
                                }
                            )
                        }
                    ).catch(
                        (error)=>{
                            reject(
                                {
                                    msg:"Color not created",
                                    status:0
                                }
                            )
                        }
                    )
                } catch (error) {
                    console.log(error);
                    reject(
                        {
                            msg:"Internal Server Error",
                            status:0
                        }
                    )
                }
                
            }
        )
    }

    read(id){
        return new Promise(
            async(resolve,reject)=>{
                try {
                    let color;
                    if(id){
                        color=await ColorModel.findById(id);
                    }
                    else{
                        color=await ColorModel.find();
                    }
                    resolve(
                        {
                            msg:"Color Found",
                            status:1,
                            color
                        }
                    )
                } catch (error) {
                    console.log(error)
                    reject(
                        {
                            msg:"Internal Server Error",
                            status:0
                        }
                    )
                }
            }
        )
    }

    delete(id){
        return new Promise(
            (resolve,reject)=>{
                try {
                    ColorModel.deleteOne(
                        {
                            _id:id
                        }
                    ).then(
                        (success)=>{
                            resolve(
                                {
                                    msg:"Color Deleted",
                                    status:1
                                }
                            )
                        }
                    ).catch(
                        (error)=>{
                            reject(
                                {
                                    msg:"Color not Deleted",
                                    status:0
                                }
                            )
                        }
                    )
                } catch (error) {
                    console.log(error);
                    reject(
                        {
                            msg:"Internal server error",
                            status:0
                        }
                    )
                }
            }
        )
    }

    statusChange(id){
        return new Promise(
        async(resolve,reject)=>{
            try {
                const color=await ColorModel.findById(id);
            ColorModel.updateOne(
                {
                    _id:id
                },
                {
                  $set:{
                    colorStatus:!color.colorStatus
                  }  
                }
            ).then(
                (success)=>{
                    if(color.colorStatus==false){
                        resolve(
                            {
                                msg:"Color Status Activated",
                                status:1
                            }
                        )
                    }
                    else{
                    resolve(
                        {
                            msg:"Color Status Deactivated",
                            status:1
                        }
                    )
                }
                }
            ).catch(
                (error)=>{
                    reject(
                        {
                            msg:"Color Status not changed",
                            status:0
                        }
                    )
                }
            )
            } catch (error) {
                console.log(error);
                reject(
                    {
                        msg:"Internal Server Error",
                        status:0
                    }
                )
            }
            
        }
        )
    }

    edit(data,id){
        return new Promise(
            async(resolve,reject)=>{
                try {
                    const color =await ColorModel.findById(id);
                    ColorModel.updateOne(
                        {
                            _id:id
                        },
                        {
                            $set:{
                               colorName:data.colorName,
                               colorSlug:data.colorSlug,
                               colorCode:data.colorCode
                            }
                        }
                    ).then(
                        (success)=>{
                            resolve(
                                {
                                    msg:"Color Updated",
                                    status:1,
                                    color
                                }
                            )
                        }
                    ).catch(
                        (error)=>{
                            reject(
                                {
                                    msg:"Color Not Updated",
                                    status:0
                                }
                            )
                        }
                    )
                } catch (error) {
                    console.log(error);
                    reject(
                        {
                            msg:"Internal Server Error",
                            status:0
                        }
                    )
                }
            }
        )
    }
}
module.exports=ColorController;