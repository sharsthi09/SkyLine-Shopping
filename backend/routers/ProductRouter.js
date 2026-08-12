const express=require('express');
const fileUpload = require('express-fileupload');
const ProductController = require('../controllers/ProductController');
const ProductRouter=express.Router();

//create 
ProductRouter.post(
    "/create",
    fileUpload(
        {
            createParentPath:true
        }
    ),
    (req,res)=>{
        const result=new ProductController().create(req.body,req.files.main_img);
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



//update
ProductRouter.patch(
    "/update/:id",
    (req,res)=>{
        const result=new ProductController().update(req.params.id,req.body.flag);
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

//multiple images
ProductRouter.post(
    "/multipleImages/:id",
    fileUpload(
        {
            createParentPath:true
        }
    ),
    (req,res)=>{
        const result=new ProductController().multipleImages(req.files?.other_img,req.params.id);
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
ProductRouter.put(
    "/edit/:id",
    fileUpload(
        {
            createParentPath:true
        }
    ),
    (req,res)=>{
        const result=new ProductController().editProduct(req.params.id,req.body,req.files.main_img);
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

//to delete
ProductRouter.delete(
    "/delete/:id",
    (req,res)=>{
        const result=new ProductController().delete(req.params.id);
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
ProductRouter.get(
  "/:id?",
  (req, res) => {
    const result = new ProductController().read(req.params.id, req.query);
    result.then(success => res.send(success))
          .catch(error => res.send(error));
  }
)

module.exports=ProductRouter;