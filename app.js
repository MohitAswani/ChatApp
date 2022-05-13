require('dotenv').config();

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const chatRoutes = require('./routes/chat');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(chatRoutes);

app.listen(process.env.PORT,()=>{
    console.log('Listening on PORT',process.env.PORT);
});