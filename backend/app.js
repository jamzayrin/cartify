const express = require('express');
const app = express();
const cors = require('cors')
const products = require('./routes/product');
const authRoutes = require('./routes/auth');

app.use(cors());
app.use(express.json());
app.use('/api/v1', products);
app.use('/api/v1', authRoutes);

module.exports = app