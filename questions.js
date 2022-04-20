const mongoose = require("mongoose");

const questionsSchema = new mongoose.Schema({
    idQuestions: {
        type: Number
    },
    questionsEN: {
        type: String
    },
    answerOneEN: {
        type: String
    },
    answerTwoEN: {
        type: String
    },
    answerThreeEN: {
        type: String
    },
    answerFourEN: {
        type: String
    },
    questionsPL: {
        type: String
    },
    answerOnePL: {
        type: String
    },
    answerTwoPL: {
        type: String
    },
    answerThreePL: {
        type: String
    },
    answerFourPL: {
        type: String
    }

}, {collection:"questions"});

module.exports = mongoose.model("Question", questionsSchema);
