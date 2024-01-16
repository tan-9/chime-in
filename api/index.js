const express = require('express');
const app = express();
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();
// console.log(process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res)=>{
    res.json('test ok');
});

app.post('/register', (req, res)=>{

});

app.listen(5000);

