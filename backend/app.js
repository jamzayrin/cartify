const express = require('express');
const app = express();
const cors = require('cors')
const products = require('./routes/product');
const authRoutes = require('./routes/auth');
const order = require('./routes/order');
const cookieParser = require('cookie-parser')


app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1', products);
app.use('/api/v1', authRoutes);
app.use('/api/v1', order);


module.exports = app