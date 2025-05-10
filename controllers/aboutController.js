const multer = require('multer');
const path = require('path');
const fs = require('fs');

/**
 * Configure storage for file uploads
 */
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // Set upload directory based on file type
    let uploadDir = 'public/uploads/';
    
    if (file.mimetype.startsWith('image/')) {
      uploadDir += 'images/';
    } else {
      uploadDir += 'files/';
    }
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    // Create unique filename with original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

/**
 * File type filter
 */
const fileFilter = (req, file, cb) => {
  // Define allowed file types
  const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
  const allowedFileTypes = ['application/pdf', 'application/illustrator'];
  const allowedTypes = [...allowedImageTypes, ...allowedFileTypes];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF, SVG, PDF, and AI files are allowed.'), false);
  }
};

/**
 * Configure upload settings
 */
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

/**
 * Handle file upload errors
 */
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer errors
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 5MB.'
      });
    }
    
    return res.status(400).json({
      success: false,
      message: err.message
    });
  } else if (err) {
    // Other errors
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
  
  next();
};

module.exports = {
  upload,
  handleUploadError
};