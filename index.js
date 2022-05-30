const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
const Player = require("./player.js");
const Question = require("./questions.js");
const Invitation = require("./invitations.js");
const CurrentQuestion = require("./currentQuestions.js");

app.use(express.json());
let port = process.env.PORT || 3000;
let uri = process.env.MONGODB_URI;
let uriLocal = process.env.MONGODB_URI_LOCAL;


app.get("/", function(req, res) {
    res.send("NodeJS + MongoDB API KnowMore.");
});


mongoose.connect(uri, {
    useNewUrlParser: true },
    function () {}
);

mongoose.connection.on("connected", function () {  
    console.log("Connected to database.");
});
mongoose.connection.on("error", function (error) {  
    console.log("No connection to the database. " + error);
});
mongoose.connection.on("disconnected", function () {  
    console.log("Disconnecting from the database."); 
});


app.get("/players", async function(req, res) {
    const players = await Player.find().exec();
    res.status(200).json(players);
});

app.get("/questions", async function(req, res) {
    const questions = await Question.find().exec();
    res.status(200).json(questions);
});

app.get("/invitations", async function(req, res) {
    const invitations = await Invitation.find().exec();
    res.status(200).json(invitations);
});

app.get("/currentQuestions", async function(req, res) {
    const currentQuestions = await CurrentQuestion.find().exec();
    res.status(200).json(currentQuestions);
});

app.post("/players", async function(req, res) {
    const player = new Player({
        idSocialMedia: req.body.idSocialMedia,
        firstName: req.body.firstName,
        surname: req.body.surname,
        name: req.body.name,
        personPhoto: req.body.personPhoto,
        token: req.body.token
    });

    try {
        await player.save();
        res.status(200).json({"success": true, "message": "Player details saved."});
    } catch (error) {
        res.status(400).json({"success": false, "message": "Error in saving player details. Error: " + error});
        console.log("No player added. Error: " + error);
    }
});

app.post("/invitations", async function(req, res) {
    const invitation = new Invitation({
        myIdSocialMedia: req.body.myIdSocialMedia,
        idSocialMedia: req.body.idSocialMedia,
        name: req.body.name,
        personPhoto: req.body.personPhoto
    });

    try {
        await invitation.save();
        res.status(200).json({"success": true, "message": "Invitation details saved."});
    } catch (error) {
        res.status(400).json({"success": false, "message": "Error in saving invitation details. Error: " + error});
        console.log("No invitation added. Error: " + error);
    }
});

app.post("/currentQuestions", async function(req, res) {
    const currentQuestion = new CurrentQuestion({
        myIdSocialMedia: req.body.myIdSocialMedia,
        friendIdSocialMedia: req.body.friendIdSocialMedia,

        initializationGame: req.body.initializationGame,
        whoseTurn: req.body.whoseTurn,
        gameProper: req.body.gameProper,

        selectedQuestions: req.body.selectedQuestions,


        myIdQuestionOne: req.body.myIdQuestionOne,
        myQuestionOneEN: req.body.myQuestionOneEN,
        myAnswerOneEN: req.body.myAnswerOneEN,
        myQuestionOnePL: req.body.myQuestionOnePL,
        myAnswerOnePL: req.body.myAnswerOnePL,
        myMarkedAnswerOne: req.body.myMarkedAnswerOne,
        myFriendMarkedAnswerOne: req.body.myFriendMarkedAnswerOne,

        myIdQuestionTwo: req.body.myIdQuestionTwo,
        myQuestionTwoEN: req.body.myQuestionTwoEN,
        myAnswerTwoEN: req.body.myAnswerTwoEN,
        myQuestionTwoPL: req.body.myQuestionTwoPL,
        myAnswerTwoPL: req.body.myAnswerTwoPL,
        myMarkedAnswerTwo: req.body.myMarkedAnswerTwo,
        myFriendMarkedAnswerTwo: req.body.myFriendMarkedAnswerTwo,

        myIdQuestionThree: req.body.myIdQuestionThree,
        myQuestionThreeEN: req.body.myQuestionThreeEN,
        myAnswerThreeEN: req.body.myAnswerThreeEN,
        myQuestionThreePL: req.body.myQuestionThreePL,
        myAnswerThreePL: req.body.myAnswerThreePL,
        myMarkedAnswerThree: req.body.myMarkedAnswerThree,
        myFriendMarkedAnswerThree: req.body.myFriendMarkedAnswerThree,


        friendIdQuestionOne: req.body.friendIdQuestionOne,
        friendQuestionOneEN: req.body.friendQuestionOneEN,
        friendAnswerOneEN: req.body.friendAnswerOneEN,
        friendQuestionOnePL: req.body.friendQuestionOnePL,
        friendAnswerOnePL: req.body.friendAnswerOnePL,
        friendMarkedAnswerOne: req.body.friendMarkedAnswerOne,

        friendIdQuestionTwo: req.body.friendIdQuestionTwo,
        friendQuestionTwoEN: req.body.friendQuestionTwoEN,
        friendAnswerTwoEN: req.body.friendAnswerTwoEN,
        friendQuestionTwoPL: req.body.friendQuestionTwoPL,
        friendAnswerTwoPL: req.body.friendAnswerTwoPL,
        friendMarkedAnswerTwo: req.body.friendMarkedAnswerTwo,

        friendIdQuestionThree: req.body.friendIdQuestionThree,
        friendQuestionThreeEN: req.body.friendQuestionThreeEN,
        friendAnswerThreeEN: req.body.friendAnswerThreeEN,
        friendQuestionThreePL: req.body.friendQuestionThreePL,
        friendAnswerThreePL: req.body.friendAnswerThreePL,
        friendMarkedAnswerThree: req.body.friendMarkedAnswerThree
    });

    try {
        await currentQuestion.save();
        res.status(200).json({"success": true, "message": "The player's questions have been saved."});
    } catch (error) {
        res.status(400).json({"success": false, "message": "Error in noting the player player's question. Error: " + error});
        console.log("The player's question could not be saved. Error: " + error);
    }
});

app.put("/players/:id", async function(req, res) {
    let conditions = { idSocialMedia: req.params.id };

    Player.findOneAndUpdate(conditions, {token: req.body.token}).then(result => {
        res.status(200).json({"success": true, "message": "Player details update."});
    }).catch(error => {
        res.status(500).json({"success": false, "message": "Error in updating player details. Error: " + error});
        console.log("Data not updated - token. Error: " + error);
    });
});

app.put("/currentQuestions/:id", async function(req, res) {
    let conditions = { _id: req.params.id };

    CurrentQuestion.findOneAndUpdate(conditions, {
        $set:{
            myIdSocialMedia: req.body.myIdSocialMedia,
            friendIdSocialMedia: req.body.friendIdSocialMedia,

            whoseTurn: req.body.whoseTurn,
            gameProper: req.body.gameProper,

            selectedQuestions: req.body.selectedQuestions,

            myIdQuestionOne: req.body.myIdQuestionOne,
            myQuestionOneEN: req.body.myQuestionOneEN,
            myAnswerOneEN: req.body.myAnswerOneEN,
            myQuestionOnePL: req.body.myQuestionOnePL,
            myAnswerOnePL: req.body.myAnswerOnePL,
            myMarkedAnswerOne: req.body.myMarkedAnswerOne,
            myFriendMarkedAnswerOne: req.body.myFriendMarkedAnswerOne,

            myIdQuestionTwo: req.body.myIdQuestionTwo,
            myQuestionTwoEN: req.body.myQuestionTwoEN,
            myAnswerTwoEN: req.body.myAnswerTwoEN,
            myQuestionTwoPL: req.body.myQuestionTwoPL,
            myAnswerTwoPL: req.body.myAnswerTwoPL,
            myMarkedAnswerTwo: req.body.myMarkedAnswerTwo,
            myFriendMarkedAnswerTwo: req.body.myFriendMarkedAnswerTwo,

            myIdQuestionThree: req.body.myIdQuestionThree,
            myQuestionThreeEN: req.body.myQuestionThreeEN,
            myAnswerThreeEN: req.body.myAnswerThreeEN,
            myQuestionThreePL: req.body.myQuestionThreePL,
            myAnswerThreePL: req.body.myAnswerThreePL,
            myMarkedAnswerThree: req.body.myMarkedAnswerThree,
            myFriendMarkedAnswerThree: req.body.myFriendMarkedAnswerThree,


            friendIdQuestionOne: req.body.friendIdQuestionOne,
            friendQuestionOneEN: req.body.friendQuestionOneEN,
            friendAnswerOneEN: req.body.friendAnswerOneEN,
            friendQuestionOnePL: req.body.friendQuestionOnePL,
            friendAnswerOnePL: req.body.friendAnswerOnePL,
            friendMarkedAnswerOne: req.body.friendMarkedAnswerOne,

            friendIdQuestionTwo: req.body.friendIdQuestionTwo,
            friendQuestionTwoEN: req.body.friendQuestionTwoEN,
            friendAnswerTwoEN: req.body.friendAnswerTwoEN,
            friendQuestionTwoPL: req.body.friendQuestionTwoPL,
            friendAnswerTwoPL: req.body.friendAnswerTwoPL,
            friendMarkedAnswerTwo: req.body.friendMarkedAnswerTwo,

            friendIdQuestionThree: req.body.friendIdQuestionThree,
            friendQuestionThreeEN: req.body.friendQuestionThreeEN,
            friendAnswerThreeEN: req.body.friendAnswerThreeEN,
            friendQuestionThreePL: req.body.friendQuestionThreePL,
            friendAnswerThreePL: req.body.friendAnswerThreePL,
            friendMarkedAnswerThree: req.body.friendMarkedAnswerThree
        }
    }).then(result => {
        res.status(200).json({"success": true, "message": "Player details update."});
    }).catch(error => {
        res.status(500).json({"success": false, "message": "Error in updating player details. Error: " + error});
        console.log("Data not updated - token. Error: " + error);
    });
});

app.delete("/invitations/:id", async function(req, res) {
    try {
        const id = req.params.id;
        await Invitation.findByIdAndDelete(id);
        res.send("The player invite has been removed.");
    } catch (error) {
        res.status(400).json({"success": false, "message": "Error removing a player invite. Error: " + error});
        console.log("Error removing a player invite. Error: " + error);
    }
});

app.all("*", (req, res) => {
    res.send("You've tried reaching a route that doesn't exist.");
});

app.listen(port, () => {
    console.log("Server running.");
});
