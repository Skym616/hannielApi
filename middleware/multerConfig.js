const multer = require('multer');

const MIME_TYPE = {
    'images/jpg': 'jpg',
    'images/jpeg': 'jpg',
    'images/png': 'jpg'
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        callback(null, "profile" + Date.now() + file.originalname);
    }
});

module.exports = multer({storage}).single('image');
