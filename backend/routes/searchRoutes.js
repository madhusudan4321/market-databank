const express = require('express');
const router = express.Router();
const { searchDatasets } = require('../controllers/searchController');
router.get('/', searchDatasets);
module.exports = router;