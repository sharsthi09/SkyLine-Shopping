const { verifyToken } = require("../helping");

const authAdmin =(req,res,next)=>{
    console.log(req.headers.authorization)
    // return;
    if(req?.headers?.authorization){
        if(verifyToken(req?.headers?.authorization)){
            next();
        }
        else{
            res.send({
                msg:"Token is not verified",
                status:0
            })
        }
    }
    else{
        res.send({
            msg:"Token not found",
            status:0
        })
    }
}

module.exports= authAdmin;