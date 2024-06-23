import JWT from 'jsonwebtoken';

export const requireAuth = (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Authentication required" });
        }

        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add the decoded user information to the request object

        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
