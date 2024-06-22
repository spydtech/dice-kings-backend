import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        requered: true,
        trim: true
    },
    displayName: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    uniqueId: {
        type: Number,
        unique: true
    }

}, { timestamps: true })

export default mongoose.model('users', userSchema);