import mongoose from "mongoose";
import { USER_TYPE } from "../config/globalKey.js";
import Models from "../model/index.js";
import { EMessage, SMessage } from "../service/message.js";
import {
  SendCreate,
  SendError400,
  SendError404,
  SendError403,
  SendError500,
  SendSuccess,
} from "../service/response.js";
import { DeCrypts, EnCrypts, jwts } from "../service/service.js";
import { ValidateRegister, ValidateLogin,ValidateProfile } from "../service/validate.js";

export default class UserController {
  static async login(req, res) {
    try {
      const validate = ValidateLogin(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.pleaseInput + validate.join(","));
      }
      const { email, password } = req.body;
      const checkEmail = await Models.User.findOne({ isActive: true, email });
      if (!checkEmail) {
        return SendError404(res, EMessage.notFound + "Email", checkEmail);
      }
      const decrypt = await DeCrypts(checkEmail.password);
      // compare password
      if (password === decrypt) {
        const encriptID = await EnCrypts(JSON.stringify(checkEmail._id));
        // encrip type
        const encriptType = await EnCrypts(JSON.stringify(USER_TYPE));
        const data = {
          _id: encriptID,
          type: encriptType,
        };
        const result = await jwts(data);
        const newData = Object.assign(
          JSON.parse(JSON.stringify(checkEmail)),
          JSON.parse(JSON.stringify(result))
        );
        return SendSuccess(res, SMessage.login, newData);
      }
      return SendError400(res, "Password is not Match");
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.serverFaild, error);
    }
  }
  static async register(req, res) {
    try {
      const validate = ValidateRegister(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.pleaseInput + validate.join(","));
      }
      const { username, email, password, phone } = req.body;
      const encrypt = await EnCrypts(password);
      if (!encrypt) {
        return SendError400(res, "Error encrypt");
      }
      const checkEmail = await Models.User.findOne({ isActive: true, email });
      if (checkEmail) {
        return SendError403(res, EMessage.emailAlready, checkEmail);
      }
      const user = await Models.User.create({
        username,
        email,
        password: encrypt,
        phone,
      });
      const encriptID = await EnCrypts(JSON.stringify(user._id));
      // encrip type
      const encriptType = await EnCrypts(JSON.stringify(USER_TYPE));

      const data = {
        _id: encriptID,
        type: encriptType,
      };
      const result = await jwts(data);
      const newData = Object.assign(
        JSON.parse(JSON.stringify(user)),
        JSON.parse(JSON.stringify(result))
      );
      return SendCreate(res, SMessage.register, newData);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.serverFaild, error);
    }
  }
  static async forgerPassword(req, res) {
    try {
      const { email, newPassword } = req.body;
      if (!email || !newPassword) {
        return SendError400(res, "email or newPassword is required!");
      }
      const checkEmail = await Models.User.findOne({ isActive: true, email });
      if (!checkEmail) {
        return SendError404(res, EMessage.notFound + "email");
      }
      const encrypt = await EnCrypts(newPassword);
      if (!encrypt) {
        return SendError400(res, "Error Encrypt newPassword");
      }
      const user = await Models.User.findByIdAndUpdate(
        checkEmail._id,
        {
          password: encrypt,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.update, user);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.serverFaild, error);
    }
  }
  static async updateProfileImage(req,res){
    try {
      const userId = req.params.userId;
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return SendError404(res, EMessage.notFound + "UserID");
      }
      const {files} = req.files;
      if(!files){
        return SendError400(res,"files is required!")
      }
      
      // const 
    } catch (error) {
      console.log(error);
      return SendError500(res,EMessage.serverFaild,error);
    }
  }
  static async updateProfile(req, res) {
    try {
      const userId = req.params.userId;
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return SendError404(res, EMessage.notFound + "UserID");
      }
      const { username, phone } = req.body;
      const validate = ValidateProfile(req.body);
      if (validate.length > 0) {
        return SendError400(res, EMessage.pleaseInput + validate.join(","));
      }
      const user = await Models.User.findByIdAndUpdate(
        userId,
        {
          username,
          phone,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.update, user);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.serverFaild, error);
    }
  }
}
