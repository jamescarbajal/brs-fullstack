require('dotenv').config();
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const { resourceLimits } = require('worker_threads');

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

const mongoKey = process.env.MONGO_BRS_URI;

// // connect to MongoDB Atlas "freeCodeCamp-PracticeCluster"
const connectMongoDb = mongoose.connect(mongoKey, { useNewUrlParser: true });

connectMongoDb;

async function checkDbConnection() {
    const conn = await connectMongoDb;
    if (conn.connection.readyState === 1) {
        console.log('Connected to DB:', mongoose.connection.name + '\n');
    } else
        console.log("Failed to connecdt to mongoDB\n");
};

checkDbConnection();

// Confirm connection to server root
app.get("/", (req, res) => {
    res.send('Hello from the server!!');
});

// confirm post to server 
app.post("/post", (req, res) => {
    res.json({ message: "Here's the JSON message!!"});
    console.log("Connected to server!\n");
});





// listen on port 5000 or PORT variable
const listener = app.listen(PORT, () => {
    console.log(`\nServer is listening on PORT ${PORT}\n`);
});