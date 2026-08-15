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
        'https://YOUR-FRONTEND-PROJECT.vercel.app'
    ]
}));

server.use(express.static('public'));

// All API routes live under /api
const apiRouter = express.Router();

apiRouter.use('/category', CategoryRouter)
apiRouter.use('/color', ColorRouter)
apiRouter.use('/product', ProductRouter)
apiRouter.use('/admin', AdminRouter)
apiRouter.use('/user', UserRouter)
apiRouter.use('/order', OrderRouter)

server.use('/api', apiRouter);

mongoose.connect(process.env.MONGODB_KEY, { dbName: 'ishop' })
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log(error))

if (process.env.NODE_ENV !== 'production') {
    server.listen(PORT, () => {
        console.log(`Server start at port ${PORT}`);
    });
}

module.exports = server;