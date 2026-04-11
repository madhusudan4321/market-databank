const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  submissionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Submission', required: true },
  adminId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  decision:     { type: String, enum: ['approved', 'rejected'], required: true },
  feedback:     { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);