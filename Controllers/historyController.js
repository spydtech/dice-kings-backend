import historyModel from "../models/historyModel.js";
// const games = [
    // { game: "Redhold", entryCoins: 512, dareBy: "Agna", acceptedBy: "Meggi", roomId: 15, winner: "Hercules", winnerCoins: 0, dateTime: "2024-01-11 23:02:55" },
//     { game: "Prodder", entryCoins: 798, dareBy: "Thoma", acceptedBy: "Kip", roomId: 6, winner: "Tallia", winnerCoins: 204, dateTime: "2023-09-27 18:15:07" },
//     { game: "Fintone", entryCoins: 566, dareBy: "Abbot", acceptedBy: "Wright", roomId: 802, winner: "Mordecai", winnerCoins: 4451, dateTime: "2023-12-27 09:26:21" },
//     { game: "Alphazap", entryCoins: 402, dareBy: "Lancelot", acceptedBy: "Lauretta", roomId: 50872, winner: "Dwain", winnerCoins: 18938, dateTime: "2023-07-25 16:34:54" },
//     { game: "Gembucket", entryCoins: 5, dareBy: "Ryan", acceptedBy: "Sherilyn", roomId: 2879, winner: "Felisha", winnerCoins: 83, dateTime: "2023-08-01 13:25:43" },
//     { game: "Zathin", entryCoins: 5715, dareBy: "Emalia", acceptedBy: "Dulciana", roomId: 439, winner: "Hildagarde", winnerCoins: 59295, dateTime: "2024-02-04 07:47:57" },
//     { game: "Bigtax", entryCoins: 36, dareBy: "Staci", acceptedBy: "Martica", roomId: 2277, winner: "Anne-marie", winnerCoins: 20567, dateTime: "2023-08-12 09:15:00" },
//     { game: "Stronghold", entryCoins: 8, dareBy: "Ronda", acceptedBy: "Freddi", roomId: 3521, winner: "Corena", winnerCoins: 3, dateTime: "2023-08-24 08:49:15" },
//     { game: "Zaam-Dox", entryCoins: 513, dareBy: "Dolley", acceptedBy: "Marijn", roomId: 11831, winner: "Carlo", winnerCoins: 3271, dateTime: "2024-03-30 06:10:39" },
//     { game: "Mat Lam Tam", entryCoins: 7, dareBy: "Candie", acceptedBy: "Kip", roomId: 9479, winner: "Ermin", winnerCoins: 17916, dateTime: "2023-09-11 02:33:58" },
//     { game: "Bamity", entryCoins: 2, dareBy: "Fredrika", acceptedBy: "Amy", roomId: 67, winner: "Orelee", winnerCoins: 7, dateTime: "2024-01-29 03:24:19" },
//     { game: "Zathin", entryCoins: 64296, dareBy: "Johna", acceptedBy: "Orbadiah", roomId: 36, winner: "Javier", winnerCoins: 0, dateTime: "2023-11-01 15:59:02" },
//     { game: "Mat Lam Tam", entryCoins: 9526, dareBy: "Job", acceptedBy: "Ransom", roomId: 49, winner: "Bevon", winnerCoins: 61, dateTime: "2023-10-10 22:45:39" },
//     { game: "Opela", entryCoins: 849, dareBy: "Orsa", acceptedBy: "Leeanne", roomId: 5, winner: "Sheppard", winnerCoins: 1301, dateTime: "2024-02-21 23:26:48" }
// ];


// Create a new history entry
export const historyController = async (req, res) => {
    const { game, entryCoins, dareBy, acceptedBy, roomId, winner, winnerCoins, date, time } = req.body;

    try {
        const newHistory = new historyModel({
            game,
            entryCoins,
            dareBy,
            acceptedBy,
            roomId,
            winner,
            winnerCoins,
            date,
            time
        });

        await newHistory.save();

        res.status(201).json(newHistory);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

// Get all history entries
export const getAllHistory = async (req, res) => {
    try {
        const histories = await historyModel.find();
        res.status(200).json(histories);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

