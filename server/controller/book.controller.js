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
import { ValidateBook, ValidateUpdateBook } from "../service/validate.js";
export default class BookController {
  static async getByCategory(req, res) {
    try {
      const categoryId = req.params.categoryId;
      if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return SendError404(res, EMessage.notFound + " category");
      }
      const books = await Models.Book.find({
        category_id: categoryId,
        isActive: true,
      }).populate({
        path: "category_id",
        select: "name createdAt updatedAt",
      });
      if (!books) {
        return SendError404(res, EMessage.notFound + " books");
      }
      return SendSuccess(res, SMessage.getByCategory, books);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.serverFaild, error);
    }
  }
  static async getByCategoryLimit(req, res) {
    try {
      const categoryId = req.params.categoryId;
      if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return SendError404(res, EMessage.notFound + " category");
      }
      const books = await Models.Book.find({
        category_id: categoryId,
        isActive: true,
      })
        .populate({
          path: "category_id",
          select: "name createdAt updatedAt",
        })
        .limit(6);
      if (!books) {
        return SendError404(res, EMessage.notFound + " books");
      }
      return SendSuccess(res, SMessage.getByCategory, books);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.serverFaild, error);
    }
  }
  static async searchBook(req, res) {
    try {
      const search = req.query.search;
      const books = await Models.Book.find({
        name: { $regex: search },
      })
        .populate({
          path: "category_id",
          select: "name createdAt updatedAt",
        })
        .limit(6);
      return SendSuccess(res, SMessage.search, books);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.serverFaild, error);
    }
  }

  static async getOne(req, res) {
    try {
      const bookId = req.params.bookId;
      if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return SendError400(res, EMessage.notFound + "bookId");
      }
      const book = await Models.Book.findOne({
        isActive: true,
        _id: bookId,
      }).populate({
        path: "category_id",
        select: "name createdAt updatedAt",
      });
      return SendSuccess(res, EMessage.getOne, book);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.serverFaild, error);
    }
  }

  static async getAll(req, res) {
    try {
      const book = await Models.Book.find({
        isActive: true,
      }).populate({
        path: "category_id",
        select: "name image createdAt updatedAt",
      });
      if (!book) {
        return SendError400(res, EMessage.notFound + "book");
      }
      return SendSuccess(res, EMessage.getAll, book);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.serverFaild, error);
    }
  }
  static async insert(req, res) {
    try {
      const validate = ValidateBook(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.pleaseInput + validate.join(","));
      }
      const { name, detail, qty, order_price, sale_price,category_id } = req.body;
      const image = req.files.image;
      if (!image) {
        return SendError400(res, "image is required!");
      }
      if(!mongoose.Types.ObjectId.isValid(category_id)){
        return SendError404(res,EMessage.notFound + " categoryId");
      }
      const image_url = await UploadImage(image.data);
      if (!image_url) {
        return SendError400(res, "Error Upload Image");
      }
      const book = await Models.Book.create({
        category_id,
        name,
        detail,
        qty,
        order_price,
        sale_price,
        image: image_url,
      });
      return SendCreate(res, SMessage.create, book);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.serverFaild, error);
    }
  }
  static async updateBook(req, res) {
    try {
      const bookId = req.params.bookId;
      if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return SendError400(res, EMessage.notFound + " bookId");
      }
      const { name, detail, amount, order_price, sale_price, oldImage } =
        req.body;
      const validate = ValidateUpdateBook(req.body);
      if (validate > 0) {
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
      const book = await Models.Book.findByIdAndUpdate(
        bookId,
        {
          name,
          detail,
          amount,
          order_price,
          sale_price,
          image: image_url,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.update, book);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.serverFaild, error);
    }
  }

  static async deleteBook(req, res) {
    try {
      const bookId = req.params.bookId;
      if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return SendError400(res, EMessage.notFound + " bookId");
      }
      const book = await Models.Book.findByIdAndUpdate(
        bookId,
        {
          isActive: false,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.delete, book);
    } catch (error) {
      return SendError500(res, EMessage.serverFaild, error);
    }
  }
}
