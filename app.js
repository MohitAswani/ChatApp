require('dotenv').config();

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csurf = require('csurf');
const flash = require('connect-flash');

const User = require('./models/user');

const errorController = require('./controllers/error');

const chatRoutes = require('./routes/chat');
const authRoutes = require('./routes/auth');

const app = express();

const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'sessions',
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httponly: true,
        store: store
    },
    store: store
}));

app.use(flash());

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    if (req.session.user) {

        User.findById(req.session.user._id)
            .then(user => {
                req.user = user;
                next();
            })
            .catch(err => {
                console.log(err);
            });
    }
    else {
        next();
    }
});

app.use((req, res, next) => {
    res.locals.isAuth = req.session.isAuth;
    // res.locals.csrfToken = req.csrfToken();
    next();
});

app.use(authRoutes);
app.use(chatRoutes);

app.use(errorController.getError);

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
