const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');

//const smsClient = require("./smsClient"); //Modify the path based on your app
//const user = {name: "shital", phone: "9503589429"};
const app = express();
app.use(cookieParser());

dotenv.config({ path: './config.env' });

require('./db/conn');
// const User = require('./model/userSchema');

app.use(express.json());

// we link the router files to make our route easy 

app.use(require('./router/auth'));
//smsClient.sendPartnerWelcomeMessage(user);

const PORT = process.env.PORT || 5000;



//// I just comment out the below about section 
// app.get('/about', (req, res) => {
//     console.log(`Hello my About`);
//     res.send(`Hello About world from the server`);
// });

// app.get('/contact', (req, res) => {
//     // res.cookie("Test", 'thapa');
//     res.send(`Hello Contact world from the server`);

// });

 

app.get('/signup', (req, res) => {
    res.send(`Hello Registration world from the server`);
});

// 3rd step heroku
if( process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
    const path = require("path");

    app.get("*", (req, res) => {

        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));

    })
}

app.listen(PORT, () => {
    console.log(`server is runnig at port no ${PORT}`);
})


