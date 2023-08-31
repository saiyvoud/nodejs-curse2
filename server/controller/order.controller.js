import UploadImage from "../config/cloudinary.js";
import { EMessage, SMessage, Status } from "../service/message.js";
import Models from "../model/index.js";
import multer from "multer";
import {
  SendCreate,
  SendError400,
  SendError404,
  SendError500,
  SendSuccess,
} from "../service/response.js";
import { ValidateOrder } from "../service/validate.js";
import mongoose from "mongoose";

export default class OrderController {
  static async getOne(req, res) {
    try {
      const orderId = req.params.orderId;
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return SendError404(res, EMessage.notFound + " order");
      }
      const order = await Models.Order.findOne({
        _id: orderId,
        isActive: true,
      });
      return SendSuccess(res, SMessage.getOne, order);
    } catch (error) {
      return SendError500(res, EMessage.serverFaild, error);
    }
  }
  static async getByUser(req, res) {
    try {
      const userId = req.params.userId;
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return SendError404(res, EMessage.notFound + " user");
      }
      const order = await Models.Order.find({
        user_id: userId,
        isActive: true,
      });
      return SendSuccess(res, SMessage.getOne, order);
    } catch (error) {
      return SendError500(res, EMessage.serverFaild, error);
    }
  }
  static async getAll(req, res) {
    try {
      const orders = await Models.Order.find({ isActive: true });
      return SendSuccess(res, SMessage.getAll, orders);
    } catch (error) {
      return SendError500(res, EMessage.serverFaild, error);
    }
  }
  static async insert(req, res) {
    try {
      const validate = ValidateOrder(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.pleaseInput + validate.join(","));
      }
      const { user_id, address_id, books, totalPrice,time } = req.body;

      let covert = JSON.parse(books);
      const bill = req.files.bill;
      if (!bill) {
        return SendError400(res, "files is required!");
      }
      const image_url = await UploadImage(bill.data);

      const order = await Models.Order.create({
        user_id,
        address_id,
        books: covert,
        time,
        totalPrice,
        bill: image_url,
      });
      // console.log(order);
      if (!order) {
        return SendError500(res, "Error insert Order");
      }
      return SendCreate(res, SMessage.create, order);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error Insert Order");
    }
  }
  static async updateOrderStatus(req, res) {
    try {
      const orderId = req.params.orderId;
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return SendError404(res, EMessage.notFound + " order");
      }
      const { status } = req.body;
      const checkStatus = Object.assign(Status);
      if (!checkStatus.include(status)) {
        return SendError400(res, "not match status");
      }
      const order = await Models.Order.findByIdAndUpdate(
        orderId,
        {
          status: status,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.update, order);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.serverFaild, error);
    }
  }
  static async deleteOrder(req, res) {
    try {
      const orderId = req.params.orderId;
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return SendError404(res, EMessage.notFound + " order");
      }
      const order = await Models.Order.findByIdAndUpdate(
        orderId,
        {
          isActive: false,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.delete, order);
    } catch (error) {
      return SendError500(res, EMessage.serverFaild, error);
    }
  }
}
