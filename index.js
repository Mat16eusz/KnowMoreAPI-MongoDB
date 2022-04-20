const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Player = require("./player.js")
const Question = require("./questions.js")

app.use(express.json());
let port = process.env.PORT || 3000;


app.get("/", function(req, res) {
    res.send("NodeJS + MongoDB API KnowMore.");
});


mongoose.connect("mongodb://localhost:27017/KnowMoreDB", {
    useNewUrlParser: true },
    function () {
        console.log("Connected to database.");
    }
);


app.get("/players", async function(req, res) {
    const players = await Player.find().exec();
    res.status(200).json(players);
});

app.get("/questions", async function(req, res) {
    const questions = await Question.find().exec();
    res.status(200).json(questions);
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
        res.status(200).json({"success": true, "message":"Player details saved."});

    } catch (err) {
        res.status(400).json({"success": false, "message":"Error in saving player details."});
    }
});

app.all("*", (req, res) => {
    res.send("You've tried reaching a route that doesn't exist.");
});

app.listen(port, () => {
    console.log(`Server running on port: http://localhost:${port}.`);
});
