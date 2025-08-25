const mongoose = require('mongoose');

const DemandSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    productType: {
        type: String,
        required: true,
    },
    quantityNeeded: {
        type: Number,
        required: true,
    },
    deliveryDate: {
        type: Date,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Demand', DemandSchema);
