import mongoose from "mongoose";

const lobbySchema = new mongoose.Schema({
    id: {
        required: true,
        type: String,
    },
    host: {
        required: true,
        type: String,
    },
    players: {
        required: true,
        type: Array,
    },
    status: {
        required: true,
        type: String,
        enum: {
            values: ["Waiting", "In Progress", "Finished"],
            message: "{VALUE} is not supported",
        },
        default: "Waiting",
    },
    problem: {
        required: true,
        type: String,
    }
});


export const Lobby = mongoose.model("Lobby", lobbySchema);
