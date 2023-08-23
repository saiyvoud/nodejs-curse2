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
import fileUpload from "express-fileupload";
import multer from "multer";
const upload = multer();
// import path from 'path';
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const app = express();
// middleware handle request and response
app.use(cors());
app.use(fileUpload());

app.use(bodyParser.json({ extended: true, limit: "500mb", parameterLimit: 500 }));
app.use(
  bodyParser.urlencoded({ extended: true, limit: "500mb", parameterLimit: 500 })
);
// app.use(upload.array("upload"));
app.use("/api/v1.0.0",router);
app.use("/api/v1.0.0/upload/", express.static("assets"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  // res.header("Access-Control-Allow-Headers", true);
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.listen(PORT, () => {
  console.log(`Server is Running http://localhost:${PORT}`);
});
