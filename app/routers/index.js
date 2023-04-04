const express = require("express");
const router = express.Router();
const authRouter = require("./authRoute");
const productRouter = require("./productRoute")
const categoryRouter = require("./categoryRoute")
const brandRouter = require("./brandRoute")

function route(app) {
    app.use('/user', authRouter);
    app.use('/product', productRouter);
    app.use('/category', categoryRouter);
    app.use('/brand', brandRouter);
}

module.exports = route;