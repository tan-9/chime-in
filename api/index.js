const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user');
const cors = require('cors');
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const ws = require('ws');

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

app.put('/profile', (req, res) => {
  const token = req.cookies?.token;
  console.log(token);
  
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => { // add async here
      if (err) {
        console.error('Error verifying token:', err);
        return res.status(401).json('Invalid token');
      }

      console.log('User Data: ', userData);

      const { userID } = userData;
      const { avatar } = req.body;

      console.log('Received avatar:', avatar);

      try {
        const user = await User.findById(userID);
        if(user.avatar){
          return res.status(400).json('avatar is set');
        }

        else{
          await User.findByIdAndUpdate(userID, { avatar });
          res.json('Avatar updated successfully');
        }
      } catch (err) {
        console.error('Error updating avatar:', err);
        return res.status(500).json('Server error');
      }
    });
  } else {
    res.status(401).json('No token');
  }
});

app.get('/user', (req, res) => {
  const token = req.cookies?.token;

  if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
          if (err) {
              console.error('Error verifying token:', err);
              return res.status(401).json('Invalid token');
          }

          // console.log('User Data: ', userData);

          const { userID, username, avatar } = userData;

          res.json({ userID, username, avatar });
      });
  } else {
      res.status(401).json('No token');
  }
});

app.post('/login', async (req, res)=>{
    const {username, password} = req.body;
    const foundUser = await User.findOne({username});

    if(foundUser){
       const passOk = bcrypt.compareSync(password, foundUser.password); //compares plain text passwords with hashed passwords
       if(passOk){
        jwt.sign({userID:foundUser._id,username}, jwtSecret, {}, (err, token)=>{
            res.cookie('token', token, {sameSite:'none', secure:true}).json({
                id: foundUser._id, avatar: foundUser.avatar,
            });
        });
       }
       else{
        res.status(401).json({message:  'Incorrect password entered'});
       }
    }

    else{
        res.status(404).json({message: 'User not found'});
    }

});

app.post('/register', async (req, res)=>{
    const {username, password, avatar} = req.body;

try{
    const hashedPwd = bcrypt.hashSync(password, bcryptSalt);
    const createdUser = await User.create({username: username, password: hashedPwd, avatar: avatar});
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

const server = app.listen(5000);
const wss = new ws.WebSocketServer({server});

wss.on('connection', (connection, req)=>{
  console.log('connected');
  console.log(req.headers);
  const cookies  = req.headers.cookie;
  if(cookies){
   const cookietokenstr = cookies.split(';').find(str=>str.startsWith('token=')); //in case of multiple cookies
  if(cookietokenstr){
    const t = cookietokenstr.split('=')[1];

    if(t){
      console.log(t);
      jwt.verify(t, jwtSecret, {}, (err, userData)=>{
        if(err) throw err;
        const {userId, username} = userData;
        connection.userId = userId;
        connection.username = username;
      });
    }
  }
}
  
  // console.log([...wss.clients].map(c=>({userId:c.userId, username: c.username})));

  const onlineData = [...wss.clients].map(c=>({userId:c.userId, username: c.username}));
  console.log(JSON.stringify(onlineData));

  [...wss.clients].forEach(client=>{
    client.send(JSON.stringify({
      online: [...wss.clients].map(c=>({userId:c.userId, username: c.username}))
    }));
  });
});




