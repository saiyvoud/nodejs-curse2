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
import { ValidateCategory } from "../service/validate.js";
import path from "path"
export default class CategoryController {
  static async getOne(req, res) {
    try {
      const categoryId = req.params.categoryId;
      if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return SendError404(res, EMessage.notFound + " categoryId");
      }
      const category = await Models.Category.findOne({
        _id: categoryId,
        isActive: true,
      });
      return SendSuccess(res, SMessage.getOne, category);
    } catch (error) {
      return SendError500(res, EMessage.serverFaild, error);
    }
  }
  static async getAll(req, res) {
    try {
      const category = await Models.Category.find({
        isActive: true,
      });
      return SendSuccess(res, SMessage.getAll, category);
    } catch (error) {
      return SendError500(res, EMessage.serverFaild, error);
    }
  }
  static async insert(req, res) {
    try {
      const { name } = req.body;
      if (!name) {
         SendError400(res, "name is required!");
      }
      const image = req.files.image;
      if (!req.files) {
        SendError400(res, "image is required!");
      }
     
      const image_url = await UploadImage(image.data);
      if (!image_url) {
        return SendError400(res, "Error Upload Image");
      }
      const category = await Models.Category.create({
        name,
        image: image_url,
      });
      return SendCreate(res, SMessage.create, category);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.serverFaild, error);
    }
  }
  static async updateCategory(req, res) {
    try {
      const categoryId = req.params.categoryId;
      if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return SendError404(res, EMessage.notFound + " categoryId");
      }
      const validate = ValidateCategory(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.pleaseInput + validate.join(","));
      }
      const { name, oldImage } = req.body;
      if (!req.files.image) {
        return SendError400(res, "image is required!");
      }
      const image_url = await UploadImage(req.files.image.data, oldImage);
      if (!image_url) {
        return SendError400(res, "Error Upload Image");
      }
      const category = await Models.Category.findByIdAndUpdate(
        categoryId,
        {
          name,
          image: image_url,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.update, category);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.serverFaild, error);
    }
  }
  static async deleteCategory(req, res) {
    try {
      const categoryId = req.params.categoryId;
      if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return SendError404(res, EMessage.notFound + " categoryId");
      }
      const category = await Models.Category.findByIdAndUpdate(
        categoryId,
        {
          isActive: false,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.delete, category);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.serverFaild, error);
    }
  }
}
