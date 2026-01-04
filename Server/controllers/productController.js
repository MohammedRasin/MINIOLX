const Product = require('../models/productSchema');

// Create Product
module.exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, image, category } = req.body;
    const product = await Product.create({
      title,
      description,
      price,
      image,
      category,

      createdBy: req.user.id, // from tokenVerify middleware
    });
    return res.status(201).json({ message: 'Product created', product });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get All Products
// module.exports.getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find().sort({ createdAt: -1 });
//     return res.status(200).json({ message: 'Products fetched', products });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

module.exports.getAllProducts = async (req, res) => {
  try {
    const { title, category } = req.query;
    customQuery = {};
    if (title) {
      customQuery.title = {
        $regex: title,
        $options: 'i', // case-insensitive
      };
    }
    if (category) {
      const cat = category.split(',');
      customQuery.category = { $in: cat };
    }
    const products = await Product.find(customQuery).sort({ createdAt: -1 });
    return res.status(200).json({ message: 'Products fetched', products });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get Product by ID
module.exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update Product
module.exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, image, category } = req.body;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Optional: only creator can edit
    if (product.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    product.title = title || product.title;
    product.description = description || product.description;
    product.price = price || product.price;
    product.image = image || product.image;
    product.category = [] || product.category;

    await product.save();
    return res.status(200).json({ message: 'Product updated', product });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete Product
module.exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Optional: only creator can delete
    if (product.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await product.remove();
    return res.status(200).json({ message: 'Product deleted', product });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// // Get all products, optionally filter by category
// module.exports.getAllProducts = async (req, res) => {
//   try {
//     const { category } = req.query;
//     let filter = {};
//     if (category) filter.category = category;

//     const products = await Product.find(filter).sort({ createdAt: -1 });
//     return res.status(200).json({ message: 'Products fetched', products });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
