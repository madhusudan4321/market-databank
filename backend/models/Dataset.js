const mongoose = require('mongoose');

const datasetSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  category:    { type: String, required: true },
  fileName:    { type: String, required: true },
  filePath:    { type: String, required: true },
  fileSize:    { type: Number },
  tags:        [{ type: String }],
  downloads:   { type: Number, default: 0 },
  submissionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Submission' }
}, { timestamps: true });

module.exports = mongoose.model('Dataset', datasetSchema);