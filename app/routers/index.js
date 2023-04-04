const express = require("express");
const router = express.Router();
const authRouter = require("./authRoute");
const productRouter = require("./productRoute")
const categoryRouter = require("./categoryRoute")

function route(app) {
    app.use('/user', authRouter);
    app.use('/product', productRouter);
    app.use('/category', categoryRouter);
}

module.exports = route;