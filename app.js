"use strict"
require("dotenv").config();
const express = require("express"),
    session = require ("express-session"),
    passport = require("passport"),
    hbs = require("hbs"),
    bodyParser = require("body-parser"),
    MongoStore = require("connect-mongo")(session);


const mongoose = require("./config/mongoose"),
    passportConfig = require("./controllers/passport"),
    auth = require("./routes/auth"),
    user = require("./routes/user");

passportConfig(passport);

const port = 3000;
const app = express();

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); 

app.use(session({
    secret: process.env.SECRET,
    resave:false,
    saveUninitialized:false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use((req,res,next)=>{
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
});

app.set("views",__dirname+"/views");
app.set("view engine","hbs");

hbs.registerPartials(__dirname+"/views/partials");

app.get("/",(req,res)=>{
    res.render("index");
});

app.use("/auth",auth);
app.use("/user",user);

app.listen(port,()=>{
    console.log(`Running on port ${port}`);
});