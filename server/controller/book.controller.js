import UploadImage from "../config/cloudinary";
import Models from "../model/index.js";
import { EMessage, SMessage } from "../service/message.js";
import { SendCreate, SendError400, SendError500 } from "../service/response.js";
import { ValidateBook } from "../service/validate.js";
export default class BookController {
  static async insert(req, res) {
    try {
      const validate = ValidateBook(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.pleaseInput + validate.join(","));
      }
      const { name, detail, qty, order_price, sale_price } = req.body;
      const image = req.files.image;
      if (!image) {
        return SendError400(res, "image is required!");
      }
      const image_url = await UploadImage(image.data);
      if (!image_url) {
        return SendError400(res, "Error Upload Image");
      }
      const book = await Models.Book.create({
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
}
