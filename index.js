import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

let serverUsers = [];
let tweets = [];

app.post("/sign-up", (req, res) =>{
    if(!req.body.username || !req.body.avatar){
        res.status(400).send("Todos os campos são obrigatórios!");
    }
    else{
        serverUsers.push({id: serverUsers.length+1,...req.body});
        res.status(201).send("OK");
    }
});


app.post("/tweets", (req, res) =>{
    if(!req.body.username || !req.body.tweet){
        res.status(400).send("Todos os campos são obrigatórios!");
    }
    else{
        tweets.push({id: tweets.length+1, ...req.body});
        res.status(201).send("OK");
    }
});

app.get("/tweets", (req, res) =>{
    let lastTweets=[];
    tweets.forEach((V, I)=>{
        if(I>tweets.length-11){
            lastTweets.push(V);
        }
    })
    for(let tweet of lastTweets){
        for(let user of serverUsers){
            if(tweet.username===user.username){
                tweet.avatar=user.avatar;
            }
        }
    }
    res.send(lastTweets);
});

app.get("/tweets/:USERNAME", (req, res) =>{
    const username = req.params.USERNAME;
    let userTweets=tweets.filter(tweet => tweet.username===username);
    let avatar;
    for(let user of serverUsers){
        if(username===user.username){
            avatar=user.avatar;
            break;
        }
    }
    userTweets.map(tweet => {
        tweet.avatar=avatar;
    })
    res.send(userTweets);
});

app.listen(5000);