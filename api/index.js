const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user');
const cors = require('cors');
const jwt = require('jsonwebtoken');

dotenv.config();
console.log(process.env.MONGO_URL);

const jwtSecret = process.env.JWT_SECRET;

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}));

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res)=>{
    res.json('test ok');
});

app.post('/register', async (req, res)=>{
    const {username, password} = req.body;

try{
    const createdUser = await User.create({username, password});
    jwt.sign({userID:createdUser._id}, jwtSecret, {}, (err, token)=>{
        if(err) throw err;
        res.cookie('token', token).status(201).json({
            id: createdUser._id,
        });
    });
}catch(err){
        if(err) throw err;
        res.status(500).json('error');
    }
    
});

app.listen(5000);




