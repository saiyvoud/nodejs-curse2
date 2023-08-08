import path from "path";
import jimp from "jimp";
import sharp from "sharp";
import fs from "fs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UploadImageToServer = async (files, fileLastName) => {
  try {
   
    const imgBuffer = Buffer.from(files, "base64");
    const imgName = `IMG-${Date.now()}.${fileLastName}`;
    console.log(imgName);
    const imgPath = `${__dirname}/../../assets/images/${imgName}`;
    // Convert image to JPEG format using sharp
    const jpegBuffer = await sharp(imgBuffer).toBuffer();
    const image = await jimp.read(jpegBuffer);
    if (!image) {
      return "Error Covert files";
    }
    image.write(imgPath);
    return imgName;
  } catch (error) {
    console.log(error);
    return "";
  }
};

export default UploadImageToServer;
