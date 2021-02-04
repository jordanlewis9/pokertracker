const router = require('express').Router();
const authController = require('./authController');
const verify = require('./../middlewares/verifyMiddleware');


router.get('/getUser', verify, authController.getUser);
router.post('/signin', authController.signin);
router.post('/signup', authController.signup);
router.put('/updateUser', authController.updateUser);

module.exports = router;