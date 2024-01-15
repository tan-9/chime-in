const express = require('express');
const app = express();

app.get('/test', (req, res)=>{
    res.json('test ok');
});

app.post('/egister', (req, res)=>{

});

app.listen(5000);