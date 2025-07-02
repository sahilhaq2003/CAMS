const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const { upload } = require('../middleware/upload'); // ✅ Correct destructuring
const User = require('../models/User');

// Profile routes
router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);
router.delete('/profile', auth, userController.deleteProfile);

// Auth routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Profile image upload
router.put('/profile-image', auth, upload.single('image'), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.profileImage = `/uploads/profile-images/${req.file.filename}`;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Image upload failed', error: err.message });
  }
});

module.exports = router;
