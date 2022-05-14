const path = require('path');

const express = require('express');

const Upload = require('../util/Upload');

const authController = require('../controllers/auth');

const router=express.Router();

router.get('/',authController.getNone);

router.get('/login',authController.getLogin);

router.post('/sign-in',authController.postSignInUser);

router.post('/register-user',authController.postRegisterUser);

router.post('/verify-user',authController.postVerifyUser);

router.post('/resendotp',authController.postResendOTP);

router.post('/details',Upload.upload.single('file'),authController.postDetails);

router.post('/logout',authController.isAuth,authController.postLogOut);

router.get('/forgotpassword',authController.getForgotPassword);

router.post('/get-email', authController.postForgotPassword);

router.post('/verifyotp', authController.postVerifyOTP);

router.post('/password-changed', authController.postResetPassword);

module.exports=router;