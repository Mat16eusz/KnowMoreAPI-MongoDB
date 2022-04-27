const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
const Player = require("./player.js");
const Question = require("./questions.js");
const Invitation = require("./invitations.js");

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

app.put("/players/:id", async function(req, res) {
    let conditions = { idSocialMedia: req.params.id };

    Player.findOneAndUpdate(conditions, {token: req.body.token}).then(result => {
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
