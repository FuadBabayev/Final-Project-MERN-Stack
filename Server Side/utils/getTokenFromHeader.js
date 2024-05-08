exports.getTokenFromHeader = (req) => {
    // Get token from header
    const token = req?.headers?.authorization?.split(" ")[1];
    if (!token) return "No Token Found in the Header";
    return token;
};