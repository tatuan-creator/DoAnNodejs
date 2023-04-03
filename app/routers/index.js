const express = require("express");
const router = express.Router();
const authRouter = require("./authRoute");
const productRouter = require("./productRoute")

function route(app) {
    app.use('/user', authRouter);
    app.use('/product', productRouter);
}

module.exports = route;