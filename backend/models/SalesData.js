const mongoose = require('mongoose');

const SalesDataSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true,
    },
    month: {
        type: String,
        required: true,
    },
    sales: {
        type: Number,
        required: true,
    },
});

const SalesData = mongoose.model('SalesData', SalesDataSchema);
module.exports = SalesData;
