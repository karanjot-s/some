const {
  bufferToDataURI,
  uploadToCloudinary,
  upload,
} = require("../utils/images");
const { authenticateToken } = require("../utils/jwt");

const router = require("express").Router();

router.post(
  "/",
  authenticateToken,
  upload.single("image"),
  async (req, res) => {
    try {
      const { file } = req;
      if (!file) return res.status(400).json({ message: "Image is required" });

      const fileFormat = file.mimetype.split("/")[1];
      const { base64 } = bufferToDataURI(fileFormat, file.buffer);

      const imageDetails = await uploadToCloudinary(base64, fileFormat);

      return res.status(200).json({
        message: "Upload successful",
        data: imageDetails,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
);

module.exports = router;
