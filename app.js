require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const connectDB = require("./config/connectDB");
const route = require(__dirname + "/app/routers");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors)
app.use("/public", express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

route(app);

app.use(notFound);
app.use(errorHandler);

connectDB();

const server = app.listen(3000, function(){
    console.log("Server is running at port 3000");
});
