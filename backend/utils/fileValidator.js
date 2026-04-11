const allowedTypes = ['.csv', '.json', '.xlsx', '.xls', '.txt'];
const maxSize = 10 * 1024 * 1024; // 10MB

const validateFile = (file) => {
  const path = require('path');
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedTypes.includes(ext)) {
    return { valid: false, message: 'Invalid file type' };
  }
  if (file.size > maxSize) {
    return { valid: false, message: 'File too large. Max 10MB allowed' };
  }
  return { valid: true };
};

module.exports = { validateFile };