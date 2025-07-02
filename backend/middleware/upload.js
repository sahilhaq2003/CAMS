const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the directory exists
const ensureFolder = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

// ========== Profile Image Upload ==========
const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads/profile-images';
    ensureFolder(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const profileUpload = multer({
  storage: profileStorage,
  fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
      return cb(new Error('Only .jpg, .jpeg, .png files are allowed'));
    }
    cb(null, true);
  }
});

// ========== Criminal Photo Upload ==========
const criminalStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads/criminal-photos';
    ensureFolder(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const criminalUpload = multer({
  storage: criminalStorage,
  fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
      return cb(new Error('Only .jpg, .jpeg, .png files are allowed'));
    }
    cb(null, true);
  }
});

module.exports = {
  upload: profileUpload,          // ✅ For user profile images
  uploadCriminal: criminalUpload  // ✅ For criminal photos
};
