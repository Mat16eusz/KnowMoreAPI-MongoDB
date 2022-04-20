const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    idSocialMedia: {
        type: String
    },
    firstName: {
        type: String
    },
    surname: {
        type: String
    },
    name: {
        type: String
    },
    personPhoto: {
        type: String,
    },
    token: {
        type: String,
    }

}, {collection:"players"});

module.exports = mongoose.model("Player", playerSchema);
