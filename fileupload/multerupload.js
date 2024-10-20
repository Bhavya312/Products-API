const multer = require("multer");
  const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Uploads will be stored in the 'uploads' directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname); // Unique filename to avoid overwriting
    }
  });

module.exports = diskStorage