var express = require("express");
var router = express.Router();

router.get("/",function(req, res){
    res.json({"message":"index"});
});

router.use("/brand", require(__dirname + "/brandcontroller"));
router.use("/category", require(__dirname + "/categorycontroller"));
router.use("/role", require(__dirname + "/rolecontroller"));
router.use("/user", require(__dirname + "/usercontroller"));

module.exports = router;