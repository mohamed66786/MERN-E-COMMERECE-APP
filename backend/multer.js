const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = file.originalname.split(".")[0];
    cb(null, filename + "-" + unique) + ".png";
  },
});

const upload=multer({storage:storage,dest:'uploads/'}).single("file")
module.exports = upload;

