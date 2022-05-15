const User = require('../models/User');
const DirectMessage = require('../models/DirectMessage');

exports.getChats = (req, res, next) => {
    req.user
        .populate('convos.messageId convos.userId')
        .then(user => {
            res.render('chat/chat.ejs', {
                pageTitle:'Chats',
                user: user
            });
        })
}

exports.searchUser = (req, res, next) => {
    var regex = new RegExp(req.query["term"], 'i');
    User.find({ username: regex})
        .select('username email profilePic')
        .limit(10)
        .then(users => {
            console.log(users);
            return res.jsonp(users);
        })
        .catch(err=>{
            console.log(err);
        });
}