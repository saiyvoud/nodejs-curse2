import crypto from "crypto-js";
import { SECRET_KEY } from "../config/globalKey.js";

export const EnCrypt = async (data) => {
  const encrypt = crypto.AES.encrypt(data, SECRET_KEY);
  return encrypt;
};

export const EnCrypts = (data) => {
  return new Promise(async (resovle, reject) => {
    try {
      const encrypt = crypto.AES.encrypt(data, SECRET_KEY);
      resovle(encrypt);
    } catch (error) {
      reject(error);
    }
  });
};
