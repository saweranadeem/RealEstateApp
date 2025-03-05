import express from "express";
import multer from "multer";
import path from "path";
const imageRoute = express.Router();

const storage = multer.diskStorage({
  //upload image in uploads folder cb is callback function null mean no error

//   console.log(req.files);
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in "uploads" folder
  },
  //name of each image =filename,file is image
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file name (if there is two same image it will make unique name of each image)
  },
});
//upload is middleware
const upload = multer({ storage });

//upload multiple images
imageRoute.post("/", upload.array("images", 6), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  // Get URLs of uploaded images (to display images on frontend it create routes of each image)
  const imageUrls = req.files.map(
    (file) => `http://localhost:3000/uploads/${file.filename}`
  );

  res.json({ imageUrls });
});

export default imageRoute;