import { EMessage } from "../service/message.js";
import { SendError401, SendError500 } from "../service/response.js";
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
    const id = DeCrypts(decode);
    req.user = id;
    next();
  } catch (error) {
    console.log(error);
    return SendError500(res, EMessage.serverFaild, error);
  }
};
