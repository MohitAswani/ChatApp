const User=require('../models/User');
const DirectMessage=require('../models/DirectMessage');

exports.getChats = (req, res, next) => {
    req.user
        .populate('convos.messageId convos.userId')
        .then(user=>{
            res.render('chat/chat.ejs',{
                user:user
            });
        })
}