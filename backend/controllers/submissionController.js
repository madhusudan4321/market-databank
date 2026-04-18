const Submission = require('../models/Submission');
const { validateFile } = require('../utils/fileValidator');

const createSubmission = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const validation = validateFile(req.file);
    if (!validation.valid) return res.status(400).json({ message: validation.message });

    const { title, description, category, contributorEmail } = req.body;

    const submission = await Submission.create({
      title,
      description,
      category,
      contributorEmail,
      fileName: req.file.originalname,
      filePath: req.file.path,
      cloudinaryUrl: req.file.path,
      fileSize: req.file.size
    });

    res.status(201).json({ message: 'Submission received! It will be reviewed shortly.', submission });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMySubmissions = async (req, res) => {
  const { email } = req.query;
  try {
    const submissions = await Submission.find({ contributorEmail: email }).sort({ createdAt: -1 });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createSubmission, getMySubmissions };