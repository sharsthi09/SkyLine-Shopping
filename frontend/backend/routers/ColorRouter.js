const express=require('express');
const ColorController = require('../controllers/ColorController');
const ColorRouter=express.Router();



//create
ColorRouter.post(
    "/create",
    (req,res)=>{
        const result=new ColorController().create(req.body);
        result.then(
            (success)=>{
                res.send(success);
            }
        ).catch(
            (error)=>{
                res.send(error)
            }
        )    
    }
)


//read 
ColorRouter.get(
    "/:id?",
    (req,res)=>{
        const result=new ColorController().read(req.params.id);
        result.then(
            (success)=>{
                res.send(success)
            }
        ).catch(
            (error)=>{
                res.send(error)
            }
        )
    }
)

//delete
ColorRouter.delete(
    "/delete/:id",
    (req,res)=>{
        const result= new ColorController().delete(req.params.id);
        result.then(
            (success)=>{
                res.send(success);
            }
        ).catch(
            (error)=>{
                res.send(error);
            }
        )
    }
)

//status change
ColorRouter.patch(
    "/status/:id",
    (req,res)=>{
        const result= new ColorController().statusChange(req.params.id);
        result.then(
            (success)=>{
                res.send(success);
            }
        ).catch(
            (error)=>{
                res.send(error);
            }
        )

    }
)

//edit color
ColorRouter.put(
    "/edit/:id",
    (req,res)=>{
        const result=new ColorController().edit(req.body,req.params.id);
        result.then(
            (success)=>{
                res.send(success);
            }
        ).catch(
            (error)=>{
                res.send(error);
            }
        )
    }
)


module.exports=ColorRouter;

