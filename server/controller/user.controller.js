import Models from "../model/index.js";
import { SendCreate, SendError400, SendError500 } from "../service/response.js";
import { EnCrypt } from "../service/service.js";
import { ValidateRegister } from "../service/validate.js";

export default class UserController {
  static async register(req, res) {
    try {
      const { username, email, password, phone } = req.body; // req.body , req.params, req.query
      const validate = ValidateRegister(req.body);
      if (validate.length > 0) {
        return SendError400(res, "Please input:" + validate.join(","));
      }
      const encrypt = await EnCrypt(password);
      if (!encrypt) {
        return SendError400(res, "Error encrypt");
      }
      const user = await Models.User.create({
        username,
        email,
        password: encrypt,
        phone,
      });
      return SendCreate(res, "Insert Success", user);
    } catch (error) {
      console.log(error);
      return SendError500(res, "Error", error);
    }
  }
}
