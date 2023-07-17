import dotenv from "dotenv";
dotenv.config();
const URL_DATABASE = process.env.URL_DATABASE;
const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;
export {URL_DATABASE,PORT,SECRET_KEY};
