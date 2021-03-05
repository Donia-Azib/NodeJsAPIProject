const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/details', auth,userCtrl.getUser);
router.get('/detailsInfo/:_id', auth,userCtrl.getUserInfo);
router.put('/details/update',auth, userCtrl.modifyUser);

module.exports = router;