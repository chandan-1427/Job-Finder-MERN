import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Dynamic storage config
const storage = multer.diskStorage({
  destination(req, file, cb) {
    let folder = 'uploads/profile-pictures'; // default

    // Use route path to decide folder
    if (req.originalUrl.includes('/employer/upload-logo')) {
      folder = 'uploads/employer-logos';
    }

    // Ensure folder exists
    fs.mkdirSync(folder, { recursive: true });

    cb(null, folder);
  },

  filename(req, file, cb) {
    cb(
      null,
      `${req.user._id}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, JPG, and PNG images are allowed'));
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
