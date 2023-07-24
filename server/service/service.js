import crypto from "crypto-js";
import {
  JWT_OUT_REFRESH_TOKEN,
  JWT_OUT_TOKEN,
  SECRET_KEY,
} from "../config/globalKey.js";
import jwt from "jsonwebtoken";

export const EnCrypts = async (data) => {
  return new Promise(async (resovle, reject) => {
    try {
      const encrypt = crypto.AES.encrypt(data, SECRET_KEY).toString();
      resovle(encrypt);
    } catch (error) {
      reject(error);
    }
  });
};
export const DeCrypts = async (data) => {
  return new Promise(async (resovle, reject) => {
    try {
      const encrypt = crypto.AES.decrypt(data, SECRET_KEY);
      let decriptPass = encrypt.toString(crypto.enc.Utf8);
      resovle(decriptPass);
    } catch (error) {
      reject(error);
    }
  });
};
export const jwts = async (data) => {
  return new Promise(async (resovle, reject) => {
    try {
      const payload = {
        id: data._id,
        type: data.type,
      };
      var encryptRefresh = await EnCrypts(payload.id);
      const payload_refress = {
        id: encryptRefresh,
        type: data.type,
      };
    
      const jwtData = {
        expiresIn: parseInt(JWT_OUT_TOKEN),
      };
      const jwtDataRefresh = {
        expiresIn: parseInt(JWT_OUT_REFRESH_TOKEN),
      };
       //Generated JWT token with Payload and secret.
      const token = jwt.sign(payload, SECRET_KEY, jwtData);
      const refreshToken = jwt.sign(
        payload_refress,
        SECRET_KEY,
        jwtDataRefresh
      );

      resovle({token,refreshToken});
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
