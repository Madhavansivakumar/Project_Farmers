const sendNotification = (user, message) => {
    // Logic to send notification based on user preferences (In-App, Email, SMS)
    console.log(`Sending notification to ${user.name}: ${message}`);
};

module.exports = { sendNotification };
