const mongoose = require("mongoose");

const invitationsSchema = new mongoose.Schema({
    idSocialMedia: {
        type: String
    },
    name: {
        type: String
    },
    personPhoto: {
        type: String,
    }

}, {collection:"invitations"});

module.exports = mongoose.model("Invitation", invitationsSchema);
