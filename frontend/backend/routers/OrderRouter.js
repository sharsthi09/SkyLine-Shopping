const express=require('express');
const OrderRouter=express.Router();
const OrderController = require('../controllers/OrderController');
const OrderModel = require("../models/OrderModel");
//create
OrderRouter.post(
    "/order-place",
    (req,res)=>{
        const result=new OrderController().orderPlace(req.body);
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

OrderRouter.post(
    "/payment-success",
    (req,res)=>{
        const result=new OrderController().paymentSuccess(req.body);
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

OrderRouter.get("/my-orders", async (req, res) => {
  try {
    const { userId } = req.query;
    console.log("Fetching orders for user:", userId);
    const orders = await OrderModel.find({ user_id: userId })
      .populate("product_details.product_id", "name imageUrl")
      .sort({ createdAt: -1 });
    console.log("Orders found:", orders.length);
    res.json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ msg: "Server Error" });
  }
});





module.exports=OrderRouter;

