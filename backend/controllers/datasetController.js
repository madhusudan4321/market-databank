const path = require('path');
const Dataset = require('../models/Dataset');

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
    const normalizedPath = dataset.filePath.replace(/\\/g, '/');
    res.download(normalizedPath, dataset.fileName);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllDatasets, getDatasetById, downloadDataset };