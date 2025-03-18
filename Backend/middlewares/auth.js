const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET ;

const authMiddleware = async (req, res, next) => {

    const token = req.header('token');
    if(!token){
        return res.status(401).json({ success: false, message: 'Authentication token is required' });

    }
    console.log('Token received:', token);

    if (!token) {
        return res.status(401).json({ success: false, message: 'Authentication token is required' });
    }

    try {
        const token_decode = jwt.verify(token, JWT_SECRET); // Verifying the token
        console.log('Token decoded:', token_decode);

        // console.log(token_decode.id)
        if (!token_decode) {
            return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
        }

        req.body.userId = token_decode.id; // Adding the userId to the request body
        console.log("Authenticated user ID:", req.body.userId);
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ success: false, message: "Error: Invalid or expired token" });
    }
};

module.exports = authMiddleware;
