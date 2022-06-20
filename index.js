import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Data
const users = [];
const tweets = [];

// Functions
const validateUser = (user) => {
    for(let i = 0; i < users.length; i++) {
        if(user.username === users[i].username) return false;
    }
    return true;
}

app.post("/sign-up", (req, res) => {
    const user = req.body;
    if (validateUser(user)) {
        users.push(user);
        res.send('Ok');
    }
    res.send("Invalid Data"); // Status code 422?
})

app.get("/tweets", (req, res) => {
    if(tweets.length === 0) res.send([]);

    const tweetList = tweets.map(t => {
        const user = users.find(u => u.username === t.username);
        return {
            username: user.username,
            avatar: user.avatar,
            tweet: t.tweet
        }
    }) // tweets contains now avatar fields

    const tweetsPerScreen = (tweets.length > 10) ? 10 : tweets.length;
    const orderedTweetList = []; // put newer tweets first and reduces length if needed
    for(let i = 1; i <= tweetsPerScreen; i++) {
        const index = tweets.length - i;
        orderedTweetList.push(tweetList[index]);
    }
    res.send(orderedTweetList);
})

app.post("/tweets", (req, res) => {
    tweets.push({
        username: req.body.username,
        tweet: req.body.tweet
    })
    res.send("OK");
})

app.listen(5000);