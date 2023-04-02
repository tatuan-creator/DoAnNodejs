const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(morgan('combined'));
app.use(express.json());

const controller = require(__dirname + "/app/controllers");
app.use(controller);

app.use("/public", express.static(__dirname + "/public"));
 
const server = app.listen(3000, function(){
    console.log("Server is running at port 3000");
});