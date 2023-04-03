const express = require("express");
const app = express();
const connectDB = require("./config/connectDB");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const route = require(__dirname + "/app/routers");
require('dotenv').config();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use("/public", express.static(__dirname + "/public"));
route(app);
app.use(notFound);
app.use(errorHandler);

connectDB();
const server = app.listen(3000, function(){
console.log("Server is running at port 3000");
});