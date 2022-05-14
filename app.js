require('dotenv').config();

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const chatRoutes = require('./routes/chat');
const authRoutes = require('./routes/auth');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(authRoutes);
app.use(chatRoutes);

app.use((req, res, next) => {
    res.status(404).render('error.ejs', {
        pageTitle: 'Page Not found'
    });
});

mongoose
    .connect(process.env.MONGODB_URI)
    .then(result => {
        app.listen(process.env.PORT, () => {
            console.log('Listening on PORT', process.env.PORT);
        });
    })
    .catch(err=>{
        console.log(err);
    });
