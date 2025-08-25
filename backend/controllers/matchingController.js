const Demand = require('../models/Demand');
const Product = require('../models/Product');
const io = require('../app').io; // Import io from app.js

// Function to check for matches and send notifications
const checkForMatches = async () => {
    try {
        const demands = await Demand.find().populate('user', ['name', 'mobileNumber']);
        const products = await Product.find().populate('user', ['name', 'mobileNumber']);

        demands.forEach(demand => {
            products.forEach(product => {
                if (demand.productType === product.type && new Date(demand.deliveryDate).getTime() >= new Date(product.marketDate).getTime()) {
                    if (demand.quantityNeeded <= product.quantity) {
                        // Exact match
                        // Notify farmer
                        io.to(product.user._id).emit('notification', {
                            message: `Your product exactly matches a demand from ${demand.user.name}`,
                            contact: demand.user.mobileNumber,
                        });

                        // Notify entrepreneur
                        io.to(demand.user._id).emit('notification', {
                            message: `A product exactly matches your demand from ${product.user.name}`,
                            contact: product.user.mobileNumber,
                        });
                    } else if (demand.quantityNeeded > product.quantity) {
                        // Partial match
                        // Notify farmer
                        io.to(product.user._id).emit('notification', {
                            message: `Your product partially matches a demand from ${demand.user.name}`,
                            contact: demand.user.mobileNumber,
                        });

                        // Notify entrepreneur
                        io.to(demand.user._id).emit('notification', {
                            message: `A product partially matches your demand from ${product.user.name}`,
                            contact: product.user.mobileNumber,
                        });
                    }
                }
            });
        });
    } catch (err) {
        console.error(err.message);
    }
};

// Call the function to check for matches and send notifications
checkForMatches();
