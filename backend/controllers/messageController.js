const Message = require('../models/Message');
const io = require('../app').io; // Import io from app.js

// Send message
exports.sendMessage = async (req, res) => {
    const { receiver, content, groupId } = req.body;
    try {
        if ((!receiver || receiver.length === 0) && !groupId) {
            return res.status(400).json({ msg: 'Receiver or groupId is required' });
        }

        const newMessage = new Message({
            sender: req.user.id,
            receiver,
            content,
            groupId,
        });
        const message = await newMessage.save();

        // Notify receiver
        if (receiver && receiver.length > 0) {
            receiver.forEach(recipient => {
                io.to(recipient).emit('notification', {
                    message: `You have a new message from ${req.user.name}`,
                    content: content,
                });
            });
        }

        res.json(message);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get messages
exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [{ sender: req.params.userId }, { receiver: req.params.userId }]
        }).populate('sender', ['name']).populate('receiver', ['name']);
        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete message
exports.deleteMessage = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) return res.status(404).json({ msg: 'Message not found' });

        await Message.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Message removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Search messages
exports.searchMessages = async (req, res) => {
    const { keyword, startDate, endDate } = req.query;
    try {
        const searchCriteria = {
            $or: [{ sender: req.params.userId }, { receiver: req.params.userId }],
        };

        if (keyword) {
            searchCriteria.content = { $regex: keyword, $options: 'i' };
        }

        if (startDate || endDate) {
            searchCriteria.timestamp = {};
            if (startDate) searchCriteria.timestamp.$gte = new Date(startDate);
            if (endDate) searchCriteria.timestamp.$lte = new Date(endDate);
        }

        const messages = await Message.find(searchCriteria).populate('sender', ['name']).populate('receiver', ['name']);
        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
