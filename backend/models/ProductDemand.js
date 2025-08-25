const mongoose = require('mongoose');

const ProductDemandSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    demand: {
        type: Number,
        required: true,
    },
});

const ProductDemand = mongoose.model('ProductDemand', ProductDemandSchema);
module.exports = ProductDemand;
