const router = require('express').Router();
const userController = require('./userController');
const verify = require('./../middlewares/verifyMiddleware');
const userValidationMiddleware = require('./../middlewares/userValidationMiddleware');

router.get('/user', verify, userController.getUser);
router.put('/user', verify, userValidationMiddleware, userController.updateUser);
router.delete('/user', verify, userController.deleteUser);

module.exports = router;
