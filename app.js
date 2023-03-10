var express = require("express");
var app = express();
var controller = require(__dirname + "/app/controllers");
app.use(controller);
var server = app.listen(3000, function(){
    console.log("Server is running at port 3000");
});