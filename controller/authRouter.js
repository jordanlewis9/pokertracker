const router = require('express').Router();
const authController = require('./authController');
const verify = require('./../middlewares/verifyMiddleware');

router.post('/signin', authController.signin);
router.post('/signup', authController.signup);

module.exports = router;