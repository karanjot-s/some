const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const DatauriParser = require("datauri/parser");

const cloudConfig = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

const memoryStorage = multer.memoryStorage();

const parser = new DatauriParser();

const bufferToDataURI = (fileFormat, buffer) =>
  parser.format(fileFormat, buffer);

const upload = multer({
  storage: memoryStorage,
});

const uploadToCloudinary = async (fileString, format) => {
  const { uploader } = cloudinary;
  const res = await uploader.upload(
    `data:image/${format};base64,${fileString}`
  );
  return res;
};

module.exports = {
  cloudConfig,
  upload,
  uploadToCloudinary,
  bufferToDataURI,
};
