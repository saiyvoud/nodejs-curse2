import cloudinary from "cloudinary";
import { Formidable } from "formidable";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "./globalKey";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const UploadImage = async (files) => {
  try {
    cloudinary.uploader.upload(files.upload.path, (result) => {
      console.log(result.public_id);
      return result.public_id;
    });
  } catch (error) {
    console.log(error);
  }
};

export default UploadImage;
