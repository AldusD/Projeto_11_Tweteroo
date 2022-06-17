import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

const users = [

];

const tweets = [

];

app.post("/sign-up", (req, res) => {
    console.log(req.body)
})

app.listen(5000);