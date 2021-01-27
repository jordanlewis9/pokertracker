const router = require('express').Router();
const authController = require('./authController');
const verify = require('./verify');
const passportSetup = require('./../model/passportSetup');


router.get('/getUser', verify.verifyUser, authController.getUser);
router.post('/signin', authController.signin);
router.post('/signup', authController.signup);
router.put('/updateUser', authController.updateUser);

module.exports = router;