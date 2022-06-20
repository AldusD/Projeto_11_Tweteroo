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

app.get("/test", (req, res) => {
    console.log(users, tweets);
    res.send('Test Done')
})

app.listen(5000);