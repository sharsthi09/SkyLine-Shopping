const express=require('express');
const UserController = require('../controllers/UserController');
const UserRouter=express.Router();


//create
UserRouter.post(
    "/create",
    (req,res)=>{
        const result=new UserController().create(req.body);
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

UserRouter.post(
    "/login",
    (req,res)=>{
        const result=new UserController().login(req.body);
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

UserRouter.post(
    "/movetodb/:userId",
    (req,res)=>{
        const result=new UserController().moveToDb(req.body,req.params.userId);
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


UserRouter.post(
    "/addtocart",
    (req,res)=>{
        const result=new UserController().addToCart(req.body);
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

UserRouter.delete("/removefromcart/:userId/:productId", (req, res) => {
  const result = new UserController().removeFromCart(req.params.userId, req.params.productId);
  result.then(success => res.send(success)).catch(error => res.send(error));
});

UserRouter.patch("/updatecartquantity", (req, res) => {
  const { user_id, product_id, delta } = req.body;
  const result = new UserController().updateCartQuantity(user_id, product_id, delta);
  result.then(success => res.send(success)).catch(error => res.send(error));
});

UserRouter.post("/addtowishlist", (req, res) => {
  const result = new UserController().addToWishlist(req.body);
  result.then(success => res.send(success)).catch(error => res.send(error));
});

UserRouter.delete("/removefromwishlist/:userId/:productId", (req, res) => {
  const result = new UserController().removeFromWishlist(req.params.userId, req.params.productId);
  result.then(success => res.send(success)).catch(error => res.send(error));
});

UserRouter.get("/getwishlist/:userId", (req, res) => {
  const result = new UserController().getWishlist(req.params.userId);
  result.then(success => res.send(success)).catch(error => res.send(error));
});

UserRouter.post("/movewishlisttodb/:userId", (req, res) => {
  const result = new UserController().moveWishlistToDb(req.body, req.params.userId);
  result.then(success => res.send(success)).catch(error => res.send(error));
});




module.exports=UserRouter;

