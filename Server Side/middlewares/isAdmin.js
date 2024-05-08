const User = require("../models/User");

exports.isAdmin = async (req, res, next) => {
    // Find the login User
    const user = await User.findById(req.userAuthId);
    // Check if Admin
    if (user?.isAdmin) {
        next();
    } else {
        next(new Error("Access denied, admin only"));
    }
};