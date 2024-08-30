const express = require('express');
const router = express.Router();
const { searchMecanique, uploadGarageImage } = require('../controllers/searchController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


router.get('/', searchMecanique);

// Ensure the directory exists
const ensureDirectoryExists = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'src/garage_images/';
        ensureDirectoryExists(dir);
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        // Use the original filename
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Use the controller function here
router.post('/upload-garage-image', upload.single('image'), uploadGarageImage);

module.exports = router;
