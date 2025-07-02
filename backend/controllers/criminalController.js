const Criminal = require('../models/Criminal');

exports.getAllCriminals = async (req, res) => {
  try {
    const list = await Criminal.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCriminalById = async (req, res) => {
  try {
    const c = await Criminal.findById(req.params.id);
    if (!c) return res.status(404).json({ message: 'Not found' });
    res.json(c);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createCriminal = async (req, res) => {
  try {
    const newCriminal = new Criminal(req.body);
    await newCriminal.save();
    res.status(201).json(newCriminal);
  } catch (err) {
    res.status(400).json({ message: 'Bad request', error: err.message });
  }
};

exports.updateCriminal = async (req, res) => {
  try {
    const updated = await Criminal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Update failed', error: err.message });
  }
};

exports.deleteCriminal = async (req, res) => {
  try {
    const deleted = await Criminal.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete error' });
  }
};

exports.uploadPhoto = async (req, res) => {
  try {
    const c = await Criminal.findById(req.params.id);
    if (!c) return res.status(404).json({ message: 'Criminal not found' });

    c.photo = `/uploads/criminal-photos/${req.file.filename}`;
    await c.save();
    res.json(c);
  } catch (err) {
    res.status(500).json({ message: 'Upload failed' });
  }
};
