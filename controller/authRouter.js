const router = require('express').Router();
const authController = require('./authController');
const verify = require('./../middlewares/verifyMiddleware');


router.get('/user', verify, authController.getUser);
router.post('/signin', authController.signin);
router.post('/signup', authController.signup);
router.put('/user', verify, authController.updateUser);
router.delete('/user', verify, authController.deleteUser);

module.exports = router;