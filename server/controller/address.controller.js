import mongoose from "mongoose";
import Models from "../model/index.js";
import { EMessage, SMessage } from "../service/message.js";
import {
  SendCreate,
  SendError400,
  SendError404,
  SendError500,
  SendSuccess,
} from "../service/response.js";
import { ValidateAddress } from "../service/validate.js";
export default class AddressController {
  static async getOne(req, res) {
    try {
      const addressId = req.params.addressId;
      if (!mongoose.Types.ObjectId.isValid(addressId)) {
        return SendError404(res, EMessage.notFound + " address");
      }
      const adddres = await Models.Address.findOne({ _id: addressId });

      return SendSuccess(res, SMessage.getOne, adddres);
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
      const user_id = await Models.Address.findOne({ user_id: userId });
      return SendSuccess(res, SMessage.getOne, user_id);
    } catch (error) {
      return SendError500(res, EMessage.serverFaild, error);
    }
  }
  static async getAll(req, res) {
    try {
      const addresses = await Models.Address.find({ isActive: true });
      if (!addresses) {
        return SendError404(res, EMessage.notFound + " adresses");
      }
      return SendSuccess(res, SMessage.getAll, addresses);
    } catch (error) {
      return SendError500(res, EMessage.serverFaild, error);
    }
  }
  static async insert(req, res) {
    try {
      const validate = ValidateAddress(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.pleaseInput + validate.join(","));
      }
      const {
        user_id,
        customer,
        express,
        branch,
        village,
        district,
        province,
        latitude,
        longitude,
        phone,
      } = req.body;
      if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return SendError404(res, EMessage.notFound + " user_id");
      }
      const address = await Models.Address.create({

        user_id,
        customer,
        express,
        branch,
        village,
        district,
        province,
        latitude,
        longitude,
        phone,
      });
      if (!address) {
        return SendError500(res, "Error Insert Address");
      }
      return SendCreate(res, SMessage.create, address);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.serverFaild, error);
    }
  }
  static async updateAddress(req, res) {
    try {
      const addressId = req.params.addressId;
      if (!mongoose.Types.ObjectId.isValid(addressId)) {
        return SendError404(res, EMessage.notFound + " address");
      }
      const validate = ValidateAddress(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.pleaseInput + validate.join(","));
      }
      const { express,branch,customer,village, district, province, latitude, longitude, phone } =
        req.body;
      const address = await Models.Address.findByIdAndUpdate(
        addressId,
        {
          customer,
          express,
          branch,
          village,
          district,
          province,
          latitude,
          longitude,
          phone,
        },
        { new: true }
      );
      if (!address) {
        return SendError404(res, EMessage.notFound + " address");
      }
      return SendSuccess(res, SMessage.update, address);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.serverFaild, error);
    }
  }
  static async deleteAddress(req, res) {
    try {
      const addressId = req.params.addressId;
      if (!mongoose.Types.ObjectId.isValid(addressId)) {
        return SendError404(res, EMessage.notFound + " address");
      }
      const address = await Models.Address.findByIdAndUpdate(
        addressId,
        { isActive: true },
        { new: true }
      );
      if (!address) {
        return SendError404(res, EMessage.notFound + " address");
      }
      return SendSuccess(res, SMessage.delete, address);
    } catch (error) {
      return SendError500(res, EMessage.serverFaild, error);
    }
  }
}
