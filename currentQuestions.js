const mongoose = require("mongoose");

const currentQuestionsSchema = new mongoose.Schema({
    myIdSocialMedia: {
        type: String
    },
    friendIdSocialMedia: {
        type: String
    },

    whoseTurn: {
        type: String
    },
    gameProper: {
        type: Boolean
    },

    selectedQuestions: {
        type: [String]
    },


    myIdQuestionOne: {
        type: Number
    },
    myQuestionOneEN: {
        type: String
    },
    myAnswerOneEN: {
        type: [String]
    },
    myQuestionOnePL: {
        type: String
    },
    myAnswerOnePL: {
        type: [String]
    },
    myMarkedAnswerOne: {
        type: Number
    },
    myFriendMarkedAnswerOne: {
        type: Number
    },

    myIdQuestionTwo: {
        type: Number
    },
    myQuestionTwoEN: {
        type: String
    },
    myAnswerTwoEN: {
        type: [String]
    },
    myQuestionTwoPL: {
        type: String
    },
    myAnswerTwoPL: {
        type: [String]
    },
    myMarkedAnswerTwo: {
        type: Number
    },
    myFriendMarkedAnswerTwo: {
        type: Number
    },

    myIdQuestionThree: {
        type: Number
    },
    myQuestionThreeEN: {
        type: String
    },
    myAnswerThreeEN: {
        type: [String]
    },
    myQuestionThreePL: {
        type: String
    },
    myAnswerThreePL: {
        type: [String]
    },
    myMarkedAnswerThree: {
        type: Number
    },
    myFriendMarkedAnswerThree: {
        type: Number
    },


    friendIdQuestionOne: {
        type: Number
    },
    friendQuestionOneEN: {
        type: String
    },
    friendAnswerOneEN: {
        type: [String]
    },
    friendQuestionOnePL: {
        type: String
    },
    friendAnswerOnePL: {
        type: [String]
    },
    friendMarkedAnswerOne: {
        type: Number
    },

    friendIdQuestionTwo: {
        type: Number
    },
    friendQuestionTwoEN: {
        type: String
    },
    friendAnswerTwoEN: {
        type: [String]
    },
    friendQuestionTwoPL: {
        type: String
    },
    friendAnswerTwoPL: {
        type: [String]
    },
    friendMarkedAnswerTwo: {
        type: Number
    },

    friendIdQuestionThree: {
        type: Number
    },
    friendQuestionThreeEN: {
        type: String
    },
    friendAnswerThreeEN: {
        type: [String]
    },
    friendQuestionThreePL: {
        type: String
    },
    friendAnswerThreePL: {
        type: [String]
    },
    friendMarkedAnswerThree: {
        type: Number
    }

}, {collection:"currentQuestions"});

module.exports = mongoose.model("CurrentQuestion", currentQuestionsSchema);
