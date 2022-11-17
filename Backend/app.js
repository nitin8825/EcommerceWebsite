const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require("dotenv/config");
const { Product } = require("./models/product");

const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");
//Routes
const productRoute = require("./routers/products");
const categoryRoute = require("./routers/category");
const usersRoute = require("./routers/user");
const orderRoute = require("./routers/orders");

const api = process.env.API_URL;
//Cors
app.use(cors());
app.options("*", cors());

//Middleware
app.use(express.json());
app.use(authJwt());
app.use(errorHandler);
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

//routes Middleware
app.use(`${api}/products`, productRoute);
app.use(`${api}/categories`, categoryRoute);
app.use(`${api}/users`, usersRoute);
app.use(`${api}/orders`, orderRoute);

//Mongoose Connection

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Console with database is successful....");
  })
  .catch((err) => {
    console.log(err);
  });

//Server
app.listen(3000, () => {
  console.log("app is running");
});
