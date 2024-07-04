const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fileType = path.extname(file.originalname).toLowerCase();
    let uploadPath = 'uploads/others/';

    if (fileType === '.jpeg' || fileType === '.jpg' || fileType === '.png') {
      uploadPath = 'uploads/pictures/';
    } else if (fileType === '.mp4' || fileType === '.avi') {
      uploadPath = 'uploads/videos/';
    }

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname).toLowerCase();
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
