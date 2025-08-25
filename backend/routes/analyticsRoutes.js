const express = require('express');
const router = express.Router();
const MarketTrends = require('../models/MarketTrends.js');
const ProductDemand = require('../models/ProductDemand.js');
const SalesData = require('../models/SalesData.js');
const auth = require('../middleware/authMiddleware.js');

// Generate Reports
router.get('/report', auth, async (req, res) => {
    const { startDate, endDate, product } = req.query;

    try {
        const marketTrends = await MarketTrends.find({
            product,
            date: { $gte: new Date(startDate), $lte: new Date(endDate) }
        });

        const productDemand = await ProductDemand.find({
            product,
            date: { $gte: new Date(startDate), $lte: new Date(endDate) }
        });

        const salesData = await SalesData.find({
            product,
            month: { $gte: new Date(startDate).toISOString().slice(0, 7), $lte: new Date(endDate).toISOString().slice(0, 7) }
        });

        res.json({ marketTrends, productDemand, salesData });
    } catch (err) {
        console.error('Error generating report:', err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
