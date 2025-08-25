const mongoose = require('mongoose');

const UserPreferencesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    notificationFrequency: {
        type: String,
        enum: ['Daily', 'Weekly'],
        required: true,
    },
    notificationType: {
        type: String,
        enum: ['In-App', 'Email', 'SMS'],
        required: true,
    },
});

const UserPreferences = mongoose.model('UserPreferences', UserPreferencesSchema);
module.exports = UserPreferences;
