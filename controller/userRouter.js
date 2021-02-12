const router = require('express').Router();
const userController = require('./userController');
const verify = require('./../middlewares/verifyMiddleware');

router.get('/user', verify, userController.getUser);
router.put('/user', verify, userController.updateUser);
router.delete('/user', verify, userController.deleteUser);

module.exports = router;
