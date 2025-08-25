const jwt = require("jsonwebtoken");
require("dotenv").config();

const tokenBlacklist = new Set(); // Same blacklist used in authController.js

module.exports = function (req, res, next) {
    let token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        token = token.replace("Bearer ", "");

        // Check if token is blacklisted
        if (tokenBlacklist.has(token)) {
            return res.status(401).json({ msg: "Token has been logged out" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error("Token validation error:", err.message);
        res.status(401).json({ msg: "Token is not valid" });
    }
};
