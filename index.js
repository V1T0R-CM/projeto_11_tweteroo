import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

let serverUsers = [];
let tweets = [];

app.post("/sign-up", (req, res) =>{
    serverUsers.push({id: serverUsers.length+1,...req.body})
    res.send("OK")
});

app.post("/tweets", (req, res) =>{
    tweets.push({id: tweets.length+1, ...req.body})
    res.send("OK")
});

app.listen(5000);