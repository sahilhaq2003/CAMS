const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { uploadCriminal } = require('../middleware/upload');
const controller = require('../controllers/criminalController');

router.use(auth);

router.get('/', controller.getAllCriminals);
router.get('/:id', controller.getCriminalById);
router.post('/', controller.createCriminal);
router.put('/:id', controller.updateCriminal);
router.delete('/:id', controller.deleteCriminal);
router.put('/:id/photo', uploadCriminal.single('photo'), controller.uploadPhoto);

module.exports = router;
