const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads/profile-images',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname);
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) {
      return cb(new Error('Only images allowed'));
    }
    cb(null, true);
  }
});

module.exports = upload;
