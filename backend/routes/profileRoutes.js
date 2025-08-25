const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware.js');
const UserProfile = require('../models/UserProfile.js'); // Ensure the correct path to the UserProfile model

// Get user profile
router.get('/', auth, async (req, res) => {
    try {
        // Debugging statement to verify token and user
        console.log('Auth middleware passed, user:', req.user);

        const profile = await UserProfile.findOne({ user: req.user.id }).populate('user', ['name', 'role']);
        if (!profile) {
            console.log('Profile not found for user:', req.user.id);
            return res.status(400).json({ msg: 'Profile not found' });
        }
        console.log('Profile found:', profile);
        res.json(profile);
    } catch (err) {
        console.error('Error fetching profile:', err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
