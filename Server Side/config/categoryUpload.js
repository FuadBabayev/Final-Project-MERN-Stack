// ! const cloudinary = require("cloudinary").v2;
const cloudinaryPackage = require("cloudinary");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = cloudinaryPackage.v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUND_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create Storage Engine for Multer
const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ["jpg", "png", "jpeg"],
    params: {
        folder: "GentShop",
    },
});

// Init Multer with Storage Engine
exports.categoryFileUpload = multer({
    storage: storage,
});