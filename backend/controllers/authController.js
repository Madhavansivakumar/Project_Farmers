const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User.js');
const UserProfile = require('../models/UserProfile.js');
const tokenBlacklist = new Set();  // Simple in-memory blacklist for demonstration

exports.registerUser = async (req, res) => {
    const { name, mobileNumber, role, password } = req.body;

    try {
        let user = await User.findOne({ mobileNumber });
        if (user) {
            console.log('User already exists with mobileNumber:', mobileNumber);
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            name,
            mobileNumber,
            role,
            password
        });

        await user.save();
        console.log('New user registered:', user);

        const userProfile = new UserProfile({
            user: user._id,
            name: user.name,
            mobileNumber: user.mobileNumber,
            role: user.role
        });
        await userProfile.save();
        console.log('User profile created:', userProfile);

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5 days' }, (err, token) => {
            if (err) throw err;
            res.json({ token, user });
            console.log('JWT generated for user:', user.id);
        });
    } catch (err) {
        console.error('Error in registerUser:', err.message);
        res.status(500).send('Server error');
    }
};

exports.loginUser = async (req, res) => {
    const { mobileNumber, password } = req.body;

    try {
        console.log('Login attempt with data:', req.body);

        let user = await User.findOne({ mobileNumber });
        if (!user) {
            console.log('User not found with mobileNumber:', mobileNumber);
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        console.log('User found:', user);

        const storedHashedPassword = user.password;
        const isMatch = await bcrypt.compare(password, storedHashedPassword);
        if (!isMatch) {
            console.log('Password does not match for user with mobileNumber:', mobileNumber);
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        console.log('Password matches for user with mobileNumber:', mobileNumber);

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5 days' }, (err, token) => {
            if (err) throw err;
            res.json({ token, user });
            console.log('JWT generated for user:', user.id);
        });
    } catch (err) {
        console.error('Server error:', err.message);
        res.status(500).send('Server error');
    }
};

// Logout user
exports.logoutUser = (req, res) => {
    let token = req.header("Authorization");

    if (!token) {
        return res.status(400).json({ msg: "No token provided" });
    }

    token = token.replace("Bearer ", ""); // Ensure correct token format

    try {
        // Validate the token before blacklisting
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);

        tokenBlacklist.add(token); // Blacklist token
        console.log("Token blacklisted:", token);
        res.json({ msg: "Logged out successfully" });

    } catch (err) {
        console.error("Logout failed - Invalid or malformed Token:", err.message);
        return res.status(401).json({ msg: "Token is not valid or malformed" });
    }
};
