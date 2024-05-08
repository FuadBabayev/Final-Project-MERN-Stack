const { getTokenFromHeader } = require("../utils/getTokenFromHeader");
const { verifyToken } = require("../utils/verifyToken");

exports.isLoggedIn = (req, res, next) => {
    // Get token form Header
    const token = getTokenFromHeader(req);
    // Verify the token
    const decodedUser = verifyToken(token);
    if (!decodedUser) throw new Error('Invalid/Expired token, please login again!');
    else {
        // Save the user into req obj
        req.userAuthId = decodedUser?.id;
        next();
    }
};