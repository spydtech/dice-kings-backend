import userModel from '../models/userModel.js';

export const getUserDetailsController = async (req, res) => {
    try {
        // Extract user ID from the token
        const userId = req.user._id;

        // Find the user by ID
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Send the user's username and uniqueId in the response
        res.status(200).json({
            username: user.username,
            uniqueId: user.uniqueId
        });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
