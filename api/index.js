const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user');
const cors = require('cors');
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

dotenv.config();
console.log(process.env.MONGO_URL);

const jwtSecret = process.env.JWT_SECRET;

const bcryptSalt = bcrypt.genSaltSync(10);


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}));

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res)=>{
    res.json('test ok');
});     

app.get('/profile', (req, res)=>{
    const token = req.cookies?.token;
    if(token){
        jwt.verify(token, jwtSecret, {}, (err, userData)=>{
            if(err) throw err;
            res.json(userData);
        });
    }
    else{
        res.status(401).json('no token');
    }
    
});

app.post('/login', async (req, res)=>{
    const {username, password} = req.body;
    const foundUser = await User.findOne({username});

    if(foundUser){
       const passOk = bcrypt.compareSync(password, foundUser.password);
       if(passOk){
        jwt.sign({userID:foundUser._id,username}, jwtSecret, {}, (err, token)=>{
            res.cookie('token', token, {sameSite:'none', secure:true}).json({
                id: foundUser._id,
            });
        });
       }
    }

});

app.post('/register', async (req, res)=>{
    const {username, password} = req.body;

try{
    const hashedPwd = bcrypt.hashSync(password, bcryptSalt);
    const createdUser = await User.create({username: username, password: hashedPwd,});
    jwt.sign({userID:createdUser._id,username}, jwtSecret, {}, (err, token)=>{
        if(err) throw err;
        res.cookie('token', token, {sameSite:'none', secure:true}).status(201).json({
            id: createdUser._id,
        });
    });
}catch(err){
        if(err) throw err;
        res.status(500).json('error');
    }
    
});

app.listen(5000);




