const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const User = require('../models/User');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);
router.delete('/profile', auth, userController.deleteProfile);

router.put('/profile-image', auth, upload.single('image'), async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    user.profileImage = `/uploads/profile-images/${req.file.filename}`;
    await user.save();
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

module.exports = router;
