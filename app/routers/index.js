const express = require("express");
const router = express.Router();
const authRouter = require("./authRoute");
const productRouter = require("./productRoute")
const categoryRouter = require("./categoryRoute")
const brandRouter = require("./brandRoute")
const couponRouter = require("./couponRoute")
const uploadRouter = require("./uploadRoute")
function route(app) {
    app.use('/user', authRouter);
    app.use('/product', productRouter);
    app.use('/category', categoryRouter);
    app.use('/brand', brandRouter);
    app.use('/coupon', couponRouter);
    app.use('/upload', uploadRouter);
}

module.exports = route;