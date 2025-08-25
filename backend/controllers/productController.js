const Product = require('../models/Product');

// Add product
exports.addProduct = async (req, res) => {
    const { type, quantity, marketDate } = req.body;
    let photo = req.file ? req.file.path : null;

    // Normalize the path to use forward slashes
    if (photo) {
        photo = photo.replace(/\\/g, '/');
    }

    console.log('Photo path:', photo); // Debugging: Log photo path
    try {
        const newProduct = new Product({
            user: req.user.id,
            type,
            quantity,
            marketDate,
            photo,
        });
        const product = await newProduct.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('user', ['name', 'mobileNumber']);
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update product
exports.updateProduct = async (req, res) => {
    const { type, quantity, marketDate } = req.body;
    let photo = req.file ? req.file.path : null;

    // Normalize the path to use forward slashes
    if (photo) {
        photo = photo.replace(/\\/g, '/');
    }

    try {
        let product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ msg: 'Product not found' });

        // Ensure user owns product
        if (product.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        product = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: { type, quantity, marketDate, photo } },
            { new: true }
        );

        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ msg: 'Product not found' });

        // Ensure user owns product
        if (product.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await Product.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Product removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
