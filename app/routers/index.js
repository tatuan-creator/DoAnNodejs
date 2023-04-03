const express = require("express");
const router = express.Router();
const authRouter = require("./authRoute");

function route(app) {
    app.use('/user', authRouter);
}

module.exports = route;