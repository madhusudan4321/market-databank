const Submission = require('../models/Submission');
const Dataset = require('../models/Dataset');
const Review = require('../models/Review');
const sendEmail = require('../utils/sendEmail');

const getPendingSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ status: 'pending' }).sort({ createdAt: -1 });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const reviewSubmission = async (req, res) => {
  const { decision, feedback, tags } = req.body;
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) return res.status(404).json({ message: 'Submission not found' });

    submission.status = decision;
    await submission.save();

    await Review.create({ submissionId: submission._id, adminId: req.user._id, decision, feedback });

    if (decision === 'approved') {
      await Dataset.create({
        title: submission.title,
        description: submission.description,
        category: submission.category,
        fileName: submission.fileName,
        filePath: submission.filePath,
        fileSize: submission.fileSize,
        tags: tags || [],
        submissionId: submission._id
      });
    }

    if (submission.contributorEmail) {
      await sendEmail({
        to: submission.contributorEmail,
        subject: `Your submission "${submission.title}" has been ${decision}`,
        text: decision === 'approved'
          ? `Great news! Your dataset "${submission.title}" has been approved and is now live on Market Databank.`
          : `Your dataset "${submission.title}" was rejected.\n\nFeedback: ${feedback || 'No feedback provided.'}\n\nYou may resubmit after making corrections.`
      });
    }

    res.json({ message: `Submission ${decision} successfully` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find().sort({ createdAt: -1 });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getPendingSubmissions, reviewSubmission, getAllSubmissions };