const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    marketDate: {
        type: Date,
        required: true,
    },
    photo: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Product', ProductSchema);
