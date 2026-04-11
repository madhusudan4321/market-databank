const express = require('express');
const router = express.Router();
const { getPendingSubmissions, reviewSubmission, getAllSubmissions } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

router.get('/submissions/pending', protect, getPendingSubmissions);
router.get('/submissions/all', protect, getAllSubmissions);
router.patch('/submissions/:id/review', protect, reviewSubmission);
module.exports = router;