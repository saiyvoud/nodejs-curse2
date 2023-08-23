import { EMessage, SMessage } from "../service/message.js";
import {
  SendCreate,
  SendError400,
  SendError404,
  SendError500,
  SendError204,
  SendSuccess,
} from "../service/response.js";
import { ValidateFavorite } from "../service/validate.js";
import Models from "../model/index.js";
import mongoose from "mongoose";
export default class FavoriteController {
  static async getByBookID(req, res) {
    try {
      const bookId = req.params.bookId;
      if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return SendError404(res, EMessage.notFound + " book");
      }
      const favorite = await Models.Favorite.findOne({
        isActive: true,
        book_id: bookId,
      });
      return SendSuccess(res, SMessage.getOne, favorite);
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
      const favorite = await Models.Favorite.findOne({
        isActive: true,
        user_id: userId,
      });
      return SendSuccess(res, SMessage.getOne, favorite);
    } catch (error) {
      return SendError500(res, EMessage.serverFaild, error);
    }
  }
  static async getAll(req, res) {
    try {
      const favorite = await Models.Favorite.find({
        isActive: true,
      });
      return SendSuccess(res, SMessage.getAll, favorite);
    } catch (error) {
      return SendError500(res, EMessage.serverFaild, error);
    }
  }
  static async insert(req, res) {
    try {
      const { book_id, user_id, like, share } = req.body;
      const validate = ValidateFavorite(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.pleaseInput + validate.join(","));
      }
      if (
        !mongoose.Types.ObjectId.isValid(book_id) ||
        !mongoose.Types.ObjectId.isValid(user_id)
      ) {
        return SendError404(res, EMessage.notFound + " book , user");
      }
      const favorite = await Models.Favorite.create({
        book_id,
        user_id,
        like,
        share,
      });
      return SendCreate(res, SMessage.create, favorite);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.serverFaild, error);
    }
  }
  static async updateFavoriteStatus(req, res) {
    try {
      const favoriteId = req.params.favoriteId;
      if (!mongoose.Types.ObjectId.isValid(favoriteId)) {
        return SendError404(res, EMessage.notFound + " favorite");
      }
      const { like, share } = req.body;

      const favorite = await Models.Favorite.findByIdAndUpdate(
        favoriteId,
        {
          like,
          share,
        },
        { new: true }
      );
      if (!favorite) {
        return SendError204(res, EMessage.nocontent, favorite);
      }
      return SendSuccess(res, SMessage.update, favorite);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.serverFaild, error);
    }
  }
  static async deleteFavorite(req, res) {
    try {
      const favoriteId = req.params.favoriteId;
      if (!mongoose.Types.ObjectId.isValid(favoriteId)) {
        return SendError404(res, EMessage.notFound + " favorite");
      }
      const favorite = await Models.Favorite.findByIdAndUpdate(
        favoriteId,
        {
          isActive: false,
        },
        { new: true }
      );
    } catch (error) {
      return SendError500(res, EMessage.serverFaild, error);
    }
  }
}
