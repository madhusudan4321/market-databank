const express = require('express');
const router = express.Router();
const { createSubmission, getMySubmissions } = require('../controllers/submissionController');
const upload = require('../config/multer');
const { uploadLimiter } = require('../middleware/rateLimiter');

router.post('/', uploadLimiter, upload.single('file'), createSubmission);
router.get('/my', getMySubmissions);
module.exports = router;