const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath;
    if (file.fieldname === 'mediaFile') {
      const fileType = path.extname(file.originalname).toLowerCase();
      uploadPath = 'uploads/others/';
      if (fileType === '.jpeg' || fileType === '.jpg' || fileType === '.png') {
        uploadPath = 'uploads/pictures/';
      } else if (fileType === '.mp4' || fileType === '.avi') {
        uploadPath = 'uploads/videos/';
      }
    } else if (file.fieldname === 'previewFile') {
      uploadPath = 'uploads/previews/';
    }

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname).toLowerCase();
    let filename;
    if (file.fieldname === 'mediaFile') {
      filename = file.fieldname + '-' + uniqueSuffix + fileExtension;
      req.generatedFilename = filename;
    } else if (file.fieldname === 'previewFile') {
      const originalFilename = req.generatedFilename || 'default';
      const nameWithoutExtension = path.basename(originalFilename, fileExtension);
      filename = nameWithoutExtension + '_preview' + fileExtension;
    }
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
