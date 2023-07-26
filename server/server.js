//common js
// const express = require("express");
// const app = express();
// app.listen(3000,()=>{
//     console.log(`Server is Running`);
// })

// es
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "./config/db.js";
import { PORT } from "./config/globalKey.js";
import router from "./router/index.js";
import formidable from "express-formidable";
const app = express();
// middleware handle request and response
app.use(cors());
// app.use(formidable());
app.use(bodyParser.json({ extended: true, limit: "500mb", parameterLimit: 500 }));
app.use(
  bodyParser.urlencoded({ extended: true, limit: "500mb", parameterLimit: 500 })
);
app.use("/api/v1.0.0",router);
app.listen(PORT, () => {
  console.log(`Server is Running http://localhost:${PORT}`);
});
