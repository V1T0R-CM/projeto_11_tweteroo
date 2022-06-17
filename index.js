import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

let serverUsers = [];
let tweets = [];

app.post("/sign-up", (req, res) =>{
    serverUsers.push({id: serverUsers.length+1,...req.body});
    res.send("OK");
});

app.post("/tweets", (req, res) =>{
    tweets.push({id: tweets.length+1, ...req.body});
    res.send("OK");
});

app.get("/tweets", (req, res) =>{
    let lastTweets=[]
    tweets.forEach((V, I)=>{
        if(I>tweets.length-11){
            lastTweets.push(V);
        }
    })
    for(let tweet of lastTweets){
        for(let user of serverUsers){
            if(tweet.username===user.username){
                tweet.avatar=user.avatar
            }
        }
    }

    res.send(lastTweets);
});

app.listen(5000);