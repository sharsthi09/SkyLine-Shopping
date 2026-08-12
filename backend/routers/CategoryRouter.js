const express=require('express');
const CategoryController = require('../controllers/CategoryController');
const fileUpload = require('express-fileupload');
const authAdmin = require('../middleware/authAdmin');
const CategoryRouter=express.Router();

//create
CategoryRouter.post(
    "/create",
    [
        fileUpload(
            {
                createParentPath:true
            }
        ),
        authAdmin
    ],
    
    (req,res)=>{
        console.log(req.files)
        const result=new CategoryController().create(req.body,req.files.categoryimage);
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

//read
CategoryRouter.get(
    "/:id?",
    // authAdmin,
    (req,res)=>{
        const result=new CategoryController().read(req.params.id);
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

//delete
CategoryRouter.delete(
    "/delete/:id",
    (req,res)=>{
        const result=new CategoryController().delete(req.params.id);
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

//edit
CategoryRouter.put(
    "/edit/:id",
    fileUpload(
        {
            createParentPath:true
        }
    ),
    (req,res)=>{
        const result=new CategoryController().edit(req.body,req.params.id,req.files?.categoryimage);
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
CategoryRouter.patch(
    "/status/:id",
    (req,res)=>{ 
        console.log(req.params.id)
        const result=new CategoryController().statusChange(req.params.id);
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
module.exports=CategoryRouter;