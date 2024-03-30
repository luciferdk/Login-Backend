const express = require('express');
const app = express();
const Port = 3000;
const jwt = require('jsonwebtoken');
const insertData = require('./db');
const userSchema = require('./schema');
const secretKey = "Lakshay21e87h2fdh2";
const cors = require('cors');
app.use(
    cors({
        origin:"http://localhost:5173",
        methods: [ 'GET', 'POST' ],
        // allowedHeaders: ['Content-Type','Authorization']
    })
);

app.use(express.json());

app.post('/signup',(req,res)=>{
    const user = req.body;
    const userParse = userSchema.safeParse(user);
    if(!userParse.success){
        res.json({
            msg:'You Send the Wrong Inputs',
        })
    }else{
        insertData(user.name,user.email,user.password);
        const token = jwt.sign({password:user.password},secretKey);
        res.json({
            msg:'User is Created',
            token :token
        })
    }
})

app.listen(Port,()=>{
    console.log('Port is Listen');
})