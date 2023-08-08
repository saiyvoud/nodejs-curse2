import mongoose from "mongoose";
import UploadImage from "../config/cloudinary.js";
import Models from "../model/index.js";
import { EMessage, SMessage } from "../service/message.js";
import {
  SendCreate,
  SendError400,
  SendError404,
  SendError500,
  SendSuccess,
} from "../service/response.js";
import { ValidateBanner, ValidateUpdateBanner } from "../service/validate.js";
export default class BannerController {
  static async getOne(req, res) {
    try {
      const bannerId = req.params.bannerId;
      if (!mongoose.Types.ObjectId.isValid(bannerId)) {
        return SendError404(res, EMessage.notFound + " bannerId");
      }
      const banner = await Models.Banner.findOne({
        isActive: true,
        _id: bannerId,
      });
      return SendSuccess(res, SMessage.getOne, banner);
    } catch (error) {
      return SendError500(res, EMessage.serverFaild, error);
    }
  }
  static async getAll(req, res) {
    try {
      const banner = await Models.Banner.find({
        isActive: true,
      });
      if (!banner) {
        return SendError404(res, EMessage.notFound + " banner");
      }
      return SendSuccess(res, SMessage.getAll, banner);
    } catch (error) {
      return SendError500(res, EMessage.serverFaild, error);
    }
  }

  static async insert(req, res) {
    try {
      const { name, detail } = req.body;
      const validate = ValidateBanner(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.pleaseInput + validate.join(","));
      }
      const image = req.files.image;
      if (!image) {
        return SendError400(res, "image is required!");
      }
      const image_url = await UploadImage(image.data);
      if (!image_url) {
        return SendError400(res, "Error Upload Image");
      }

      const banner = await Models.Banner.create({
        name,
        detail,
        image: image_url,
      });
      return SendCreate(res, SMessage.create, banner);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.serverFaild, error);
    }
  }
  static async updateBanner(req, res) {
    try {
      const bannerId = req.params.bannerId;
      if (!mongoose.Types.ObjectId.isValid(bannerId)) {
        return SendError404(res, EMessage.notFound + " bannerId");
      }
      const { name, detail, oldImage } = req.body;
      const validate = ValidateUpdateBanner(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.pleaseInput + validate.join(","));
      }
      const image = req.files.newImage;
      if (!image) {
        return SendError400(res, "image is required!");
      }
      const image_url = await UploadImage(image.data, oldImage);
      if (!image_url) {
        return SendError400(res, "Error Upload Image");
      }
      const banner = await Models.Banner.findByIdAndUpdate(
        bannerId,
        {
          name,
          detail,
          image: image_url,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.update, banner);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.serverFaild, error);
    }
  }
  static async deleteBanner(req, res) {
    try {
      const bannerId = req.params.bannerId;
      if (!mongoose.Types.ObjectId.isValid(bannerId)) {
        return SendError404(res, EMessage.notFound + " bannerId");
      }
      const banner = await Models.Banner.findByIdAndUpdate(
        bannerId,
        {
          isActive: false,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.delete, banner);
    } catch (error) {
      return SendError500(res, EMessage.serverFaild, error);
    }
  }
}
