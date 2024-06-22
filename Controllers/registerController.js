import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import { comparePassword, hashPassword } from '../helpers/authHelper.js';

export const registerController = async (req, res) => {
    try {
        const { displayName, username, phoneNumber, password } = req.body;

        // Validate input data
        if (!displayName || !username || !phoneNumber || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the user already exists
        const existingUser = await userModel.findOne({ phoneNumber });
        if (existingUser) {
            return res.status(400).json({ message: "Phone number already exists" });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Generate a unique 5-digit ID
        let uniqueId;
        let isUnique = false;
        while (!isUnique) {
            uniqueId = Math.floor(10000 + Math.random() * 90000); // Generates a 5-digit number
            const userWithSameId = await userModel.findOne({ uniqueId });
            if (!userWithSameId) {
                isUnique = true;
            }
        }

        // Create a new user
        const newUser = new userModel({
            displayName,
            username,
            phoneNumber,
            password: hashedPassword,
            uniqueId
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
