const Demand = require('../models/Demand');

// Add demand
exports.addDemand = async (req, res) => {
    const { productType, quantityNeeded, deliveryDate } = req.body;
    try {
        const newDemand = new Demand({
            user: req.user.id,
            productType,
            quantityNeeded,
            deliveryDate,
        });
        const demand = await newDemand.save();
        res.json(demand);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all demands
exports.getDemands = async (req, res) => {
    try {
        const demands = await Demand.find().populate('user', ['name', 'mobileNumber']);
        res.json(demands);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update demand
exports.updateDemand = async (req, res) => {
    const { productType, quantityNeeded, deliveryDate } = req.body;
    try {
        let demand = await Demand.findById(req.params.id);
        if (!demand) return res.status(404).json({ msg: 'Demand not found' });

        // Ensure user owns demand
        if (demand.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        demand = await Demand.findByIdAndUpdate(
            req.params.id,
            { $set: { productType, quantityNeeded, deliveryDate } },
            { new: true }
        );

        res.json(demand);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete demand
exports.deleteDemand = async (req, res) => {
    try {
        const demand = await Demand.findById(req.params.id);
        if (!demand) return res.status(404).json({ msg: 'Demand not found' });

        // Ensure user owns demand
        if (demand.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await Demand.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Demand removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
