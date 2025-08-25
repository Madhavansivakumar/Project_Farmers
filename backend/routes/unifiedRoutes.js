const express = require('express');
const router = express.Router();
const { getUnifiedListings } = require('../controllers/unifiedController.js');
const auth = require('../middleware/authMiddleware.js');

router.get('/', auth, getUnifiedListings);

module.exports = router;
