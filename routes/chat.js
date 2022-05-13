const path = require('path');

const express = require('express');

const router = express.Router();

const chatController = require('../controllers/chat');

router.get('/',chatController.getIndex);

module.exports=router;