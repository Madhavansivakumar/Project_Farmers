const express = require('express');
const router = express.Router();
const { sendMessage, getMessages, deleteMessage, searchMessages } = require('../controllers/messageController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, sendMessage);
router.get('/:userId', auth, getMessages);
router.delete('/:id', auth, deleteMessage);
router.get('/search/:userId', auth, searchMessages); // Route for searching messages

module.exports = router;
