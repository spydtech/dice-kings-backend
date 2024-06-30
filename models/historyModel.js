import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
    game: String,
    entryCoins: Number,
    dareBy: String,
    acceptedBy: String,
    roomId: Number,
    winner: String,
    winnerCoins: Number,
    date: Date,
    time: String,
});


export default mongoose.model('History', historySchema);


