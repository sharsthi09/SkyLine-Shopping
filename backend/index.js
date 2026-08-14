require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const CategoryRouter = require('./routers/CategoryRouter');
const ColorRouter = require('./routers/ColorRouter');
const ProductRouter = require('./routers/ProductRouter');
const AdminRouter = require('./routers/AdminRouter');
const UserRouter = require('./routers/UserRouter');
const OrderRouter = require('./routers/OrderRouter');

const server = express();
const PORT = process.env.PORT || 5001;

server.use(express.json());
server.use(cors({
    origin: [
        'http://localhost:5173',
        'https://YOUR-FRONTEND-PROJECT.vercel.app' // add real frontend URL once deployed
    ]
}));

server.use(express.static('public')); // lowercase — match your actual folder name exactly (Linux is case-sensitive)

server.use('/category', CategoryRouter)
server.use('/color', ColorRouter)
server.use('/product', ProductRouter)
server.use('/admin', AdminRouter)
server.use('/user', UserRouter)
server.use('/order', OrderRouter)

mongoose.connect(process.env.MONGODB_KEY, { dbName: 'ishop' })
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log(error))

// Only bind a port locally — Vercel's serverless runtime handles requests itself
if (process.env.NODE_ENV !== 'production') {
    server.listen(PORT, () => {
        console.log(`Server start at port ${PORT}`);
    });
}

module.exports = server;