const express = require("express");
const router = express.Router();

router.get("/",function(req, res){
    res.json({"message":"index"});
});

router.use("/brand", require(__dirname + "/admin/brandcontroller"));
router.use("/category", require(__dirname + "/admin/categorycontroller"));
router.use("/role", require(__dirname + "/admin/rolecontroller"));
router.use("/user", require(__dirname + "/admin/usercontroller"));

module.exports = router;