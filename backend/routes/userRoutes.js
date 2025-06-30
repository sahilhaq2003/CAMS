const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');


router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);

router.post('/register', userController.register);
router.post('/login', userController.login);
router.delete('/profile', auth, userController.deleteProfile);

module.exports = router;