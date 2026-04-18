const Dataset = require('../models/Dataset');
const https = require('https');
const http = require('http');

const getAllDatasets = async (req, res) => {
  try {
    const datasets = await Dataset.find().sort({ createdAt: -1 });
    res.json(datasets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getDatasetById = async (req, res) => {
  try {
    const dataset = await Dataset.findById(req.params.id);
    if (!dataset) return res.status(404).json({ message: 'Dataset not found' });
    res.json(dataset);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const downloadDataset = async (req, res) => {
  try {
    const dataset = await Dataset.findById(req.params.id);
    if (!dataset) return res.status(404).json({ message: 'Dataset not found' });

    dataset.downloads += 1;
    await dataset.save();

    const fileUrl = dataset.cloudinaryUrl || dataset.filePath;
    const fileName = dataset.fileName;

    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'application/octet-stream');

    const protocol = fileUrl.startsWith('https') ? https : http;
    protocol.get(fileUrl, (fileRes) => {
      fileRes.pipe(res);
    }).on('error', (err) => {
      res.status(500).json({ message: 'Download failed: ' + err.message });
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllDatasets, getDatasetById, downloadDataset };