const express = require('express');
const router = express.Router();
const { addDemand, getDemands, updateDemand, deleteDemand } = require('../controllers/demandController.js');
const auth = require('../middleware/authMiddleware.js');

router.post('/', auth, addDemand);
router.get('/', getDemands);
router.put('/:id', auth, updateDemand);
router.delete('/:id', auth, deleteDemand);

module.exports = router;
