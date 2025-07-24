require('dotenv').config()

const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const CategoryRouter = require('./routers/CategoryRouter');
const ColorRouter = require('./routers/ColorRouter');
const ProductRouter = require('./routers/ProductRouter');
const AdminRouter = require('./routers/AdminRouter');
const UserRouter = require('./routers/UserRouter');
const OrderRouter = require('./routers/OrderRouter');

const server = express();

server.use(express.json());
server.use(cors(
    {
        origin:['http://localhost:5173']
    }
))

server.use(express.static('Public'));

server.use('/category',CategoryRouter)
server.use('/color',ColorRouter)
server.use('/product',ProductRouter)
server.use('/admin', AdminRouter)
server.use('/user', UserRouter)
server.use('/order', OrderRouter)


// console.log(process.env.MONGODB_KEY)

mongoose.connect(
    process.env.MONGODB_KEY,
    {
        dbName:'ishop'
    }
).then(
    (success)=>{
        server.listen(
            5001,
            ()=>{
                console.log("Server start at port 5001")
            }
        )
    }
).catch(
    (error)=>{
        console.log(error)
    }
)