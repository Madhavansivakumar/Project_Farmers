const mongoose = require('mongoose');

const UserProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    role: {
        type: String,
        enum: ['Farmer', 'Entrepreneur'],
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    },
    profilePicture: {
        type: String,
    },
    businessInfo: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const UserProfile = mongoose.model('UserProfile', UserProfileSchema);
module.exports = UserProfile;
