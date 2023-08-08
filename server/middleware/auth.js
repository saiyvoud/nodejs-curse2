import Models from "../model/index.js";
import { EMessage, Role } from "../service/message.js";
import {
  SendError401,
  SendError500,
  SendError400,
} from "../service/response.js";
import { DeCrypts } from "../service/service.js";
import { VerifyToken } from "../service/service.js";

export const auth = async (req, res, next) => {
  try {
    const authorization = req.headers["authorization"];
    if (!authorization) {
      return SendError401(res, EMessage.invalidToken);
    }
    const token = authorization.replace("Bearer ", "");
    if (!token) {
      return SendError401(res, EMessage.invalidToken);
    }
    const decode = await VerifyToken(token);
    req.user = decode._id;
    next();
  } catch (error) {
    console.log(error);
    return SendError500(res, EMessage.serverFaild, error);
  }
};

export const auth_admin = async (req, res, next) => {
  try {
    const id = req.user;
    const user = await Models.User.findById(id);
    if (!user) {
      return SendError401(res, EMessage.notFound + "userId");
    }
    if (user.role === Role.admin ) {
      const checkRole = await Models.User.findOne({
        _id: id,
        isActive: true,
        role: user.role,
      });

      if (!checkRole) {
        return SendError400(res, "Error Role");
      }
      next();
    } else {
      return SendError400(res, "Error Role");
    }
  } catch (error) {
    console.log(error);
    return SendError500(res, EMessage.serverFaild, error);
  }
};
