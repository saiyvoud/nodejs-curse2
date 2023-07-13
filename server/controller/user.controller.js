import Models from "../model/index.js";
import { SendCreate, SendError500 } from "../service/response.js";

export default class UserController {
  static async register(req, res) {
    try {
      const { username, email, password, phone } = req.body; // req.body , req.params, req.query
      const user = await Models.User.create({
        username,
        email,
        password,
        phone,
      });
      return SendCreate(res, "Insert Success", user);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error", error);
    }
  }
}
