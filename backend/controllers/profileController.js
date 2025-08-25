const UserProfile = require('../models/UserProfile');
const User = require('../models/User');

// Get user profile
exports.getProfile = async (req, res) => {
    try {
        console.log('Token:', req.header('Authorization'));
        const profile = await UserProfile.findOne({ user: req.user.id });
        if (!profile) {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    const { name, mobileNumber, location, businessInfo } = req.body;

    const profileFields = { name, mobileNumber, location, businessInfo };
    try {
        let profile = await UserProfile.findOne({ user: req.user.id });
        if (profile) {
            // Update
            profile = await UserProfile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );
            return res.json(profile);
        }
        // Create
        profile = new UserProfile({ user: req.user.id, ...profileFields });
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Upload profile picture
exports.uploadProfilePicture = async (req, res) => {
    try {
        const profile = await UserProfile.findOne({ user: req.user.id });
        if (!profile) {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        profile.profilePicture = req.body.profilePicture; // Handle file upload properly
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
