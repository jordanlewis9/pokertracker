const router = require('express').Router();
const verify = require('./../middlewares/verifyMiddleware');
const sessionController = require('./sessionController');
const sessionValidation = require('./../middlewares/sessionValidationMiddleware');
const formatSessionInput = require('./../middlewares/formatSessionInputs');

router.get('/accum', verify, sessionController.getAccumSessions);
router.post('/session', verify, sessionValidation, formatSessionInput, sessionController.addNewSession);
router.delete('/session', verify, sessionController.deleteSession);
router.get('/session', verify, sessionController.getSession);
router.put('/session', verify, sessionValidation, formatSessionInput, sessionController.editSession);
router.get('/allSessions', verify, sessionController.getAllSessions);

module.exports = router;