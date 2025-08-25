const mongoose = require('mongoose');

const MarketTrendsSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    highestPrice: {
        type: Number,
        required: true,
    },
    lowestPrice: {
        type: Number,
        required: true,
    },
    averagePrice: {
        type: Number,
        required: true,
    },
});

const MarketTrends = mongoose.model('MarketTrends', MarketTrendsSchema);
module.exports = MarketTrends;
