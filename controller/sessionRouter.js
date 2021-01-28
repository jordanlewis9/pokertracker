const router = require('express').Router();
const verify = require('./../middlewares/verifyMiddleware');
const sessionController = require('./sessionController');

router.get('/accum', verify, sessionController.getAccumSessions);
router.post('/new', verify, sessionController.addNewSession);
router.delete('/delete', verify, sessionController.deleteSession);
router.get('/session', verify, sessionController.getSession);
router.put('/session', verify, sessionController.editSession);
router.get('/allSessions', verify, sessionController.getAllSessions);

module.exports = router;