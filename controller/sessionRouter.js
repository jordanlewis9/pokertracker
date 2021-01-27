const router = require('express').Router();
const verify = require('./verify');
const sessionController = require('./sessionController');

router.get('/accum', verify.verifyUser, sessionController.getAccumSessions);
router.post('/new', verify.verifyUser, sessionController.addNewSession);
router.delete('/delete', verify.verifyUser, sessionController.deleteSession);
router.get('/session', verify.verifyUser, sessionController.getSession);
router.put('/session', verify.verifyUser, sessionController.editSession);
router.get('/allSessions', verify.verifyUser, sessionController.getAllSessions);

module.exports = router;