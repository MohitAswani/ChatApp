const path = require('path');

const express = require('express');

const router = express.Router();

const chatController = require('../controllers/chat');

const isAuth=require('../middleware/is-auth');

router.get('/chats',isAuth,chatController.getChats);

module.exports=router;