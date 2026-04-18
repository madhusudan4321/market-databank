const multer = require('multer');
const path = require('path');
const { storage } = require('./cloudinary');

const fileFilter = (req, file, cb) => {
  const allowed = ['.csv', '.json', '.xlsx', '.xls', '.txt'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only CSV, JSON, Excel, and TXT files are allowed'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }
});

module.exports = upload;