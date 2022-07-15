const cors = require("cors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var storesRouter = require("./routes/stores");
var productsRouter = require("./routes/products");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/stores", storesRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/", authRouter);

module.exports = app;
