const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  title:         { type: String, required: true },
  description:   { type: String, required: true },
  category:      { type: String, required: true },
  contributorEmail: { type: String, default: '' },
  fileName:      { type: String, required: true },
  filePath:      { type: String, required: true },
  fileSize:      { type: Number },
  status:        { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);