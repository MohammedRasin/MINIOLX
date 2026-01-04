const express = require('express');
const router = express.Router();
const { tokenVerify } = require('../middlewares/tokenVerify');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { route } = require('./userRoutes');

// Protect routes, only logged-in users
router.use(tokenVerify());

router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', tokenVerify(), updateProduct);
router.delete('/:id', tokenVerify(), deleteProduct);

module.exports = router;
