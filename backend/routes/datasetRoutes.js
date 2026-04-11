const express = require('express');
const router = express.Router();
const { getAllDatasets, getDatasetById, downloadDataset } = require('../controllers/datasetController');

router.get('/', getAllDatasets);
router.get('/:id', getDatasetById);
router.get('/:id/download', downloadDataset);
module.exports = router;