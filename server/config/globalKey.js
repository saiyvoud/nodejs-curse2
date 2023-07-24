import dotenv from "dotenv";
dotenv.config();
const URL_DATABASE = process.env.URL_DATABASE;
const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;
const JWT_OUT_TOKEN = process.env.JWT_OUT_TOKEN;
const JWT_OUT_REFRESH_TOKEN = process.env.JWT_OUT_REFRESH_TOKEN;
const USER_TYPE = process.env.USER_TYPE
export { URL_DATABASE, PORT, SECRET_KEY, JWT_OUT_REFRESH_TOKEN, JWT_OUT_TOKEN,USER_TYPE };
