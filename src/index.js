require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const {sequelize, User, Message} = require('./models');


const app = express();

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

sequelize.sync({ force: false }).then(() => {
    console.log('Database connected');
}).catch(err => {
    console.log(err);
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});