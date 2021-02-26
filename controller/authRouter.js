const router = require('express').Router();
const authController = require('./authController');
const verify = require('./../middlewares/verifyMiddleware');
const userValidationMiddleware = require('./../middlewares/userValidationMiddleware');

router.post('/signin', userValidationMiddleware, authController.signin);
router.post('/signup', userValidationMiddleware, authController.signup);

module.exports = router;