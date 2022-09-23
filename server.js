const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
let bodyParser = require('body-parser');

let mongoose;
try {
    mongoose = require("mongoose");
}   catch (e) {
    console.log(e);
}

// error timeout
const TIMEOUT = 10000;

//error handler
app.use(function (err, req, res, next){
    if (err) {
        res.status(err.status || 500)
        .type("txt")
        .send(err.message || "SERVER ERROR");
    };
});

// Root-level request logger
app.use(function requestLogger(req, res, next){
    console.log(req.method + " " + req.path + " " + req.ip + "\n");
    next();
})

// enable use body-parser to read json data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve index.html
app.get("/", (req, res) => {
    res.send("Hello World!");
    console.log("Hi there!");
});

// confirm post to server 
app.post("/post", (req, res) => {
    res.json({ message: "Here's the JSON message!!"});
    console.log("Connected to server!\n");
});





// listen on port 5000 or PORT variable
const listener = app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}\n`);
});