const Demand = require('../models/Demand');
const Product = require('../models/Product');

// Get unified listings
exports.getUnifiedListings = async (req, res) => {
    try {
        const demands = await Demand.find().populate('user', ['name', 'mobileNumber']);
        const products = await Product.find().populate('user', ['name', 'mobileNumber']);
        res.json({ demands, products });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
