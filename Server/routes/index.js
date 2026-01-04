const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');

// Product routes
router.use('/products', productRoutes);
// Add other route imports here as needed
router.use('/users', userRoutes);

module.exports = router;
