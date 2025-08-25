const express = require('express');
const router = express.Router();
const multer = require('multer');
const { addProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const auth = require('../middleware/authMiddleware');

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/', auth, upload.single('photo'), addProduct);
router.get('/', getProducts);
router.put('/:id', auth, upload.single('photo'), updateProduct);
router.delete('/:id', auth, deleteProduct);

module.exports = router;
