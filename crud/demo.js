const express = require('express');
const app=express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/apiusers',require('./User'))

app.listen(8080,()=>{
    
    console.log('listening to server:8080');
})