const express = require('express');
require('./dataBase');
var cors = require('cors')
const app = express();

app.use(cors())
app.use(express.json())

app.use('/api/auth/',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.get('/',(req, res)=>{
    console.log("Connection Successful node")
    res.send("Connection Successful node");
})

app.listen(5000);




