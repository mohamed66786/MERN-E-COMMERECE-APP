const express = require("express");
// const ErrorHandler = require("./utils/ErrorHandler");
const app = express();
const cookieParser = require("cookie-parser");
const cors=require("cors");

app.use(cors()) 
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use("/", express.static("uploads"));
// config
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ 
    path: "backend/config/.env", 
  });
}

//routes
const user = require("./controller/user");
app.use("/api/v2/user", user);


module.exports = app;
