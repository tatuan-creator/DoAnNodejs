var express = require("express");
const { ObjectId } = require("mongodb");
var router = express.Router();
var User = require("./../model/user");
var UserService = require("../services/userService");


router.get("/", async function(req,res){
    var userService = new UserService();
    var user =  await userService.getUserList();
    res.json(user);
});

router.get("/get-user", async function(req,res){
    var userService = new UserService();
    var user =  await userService.getUser(req.query.id);
    res.json(user);
});


router.post("/insert-user", async function(req,res){
    var userService = new UserService();
    var user = new User();
    user.roleId = req.body.roleId;
    user.userName = req.body.userName;
    user.password = req.body.password;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.gender = req.body.gender;
    user.birthDate = req.body.birthDate;
    user.email = req.body.email;
    user.phoneNumber = req.body.phoneNumber;
    user.address = req.body.address;
    user.status = true;
   
    var result =  await userService.insertUser(user);
    res.json({status: true, message:""});
});


router.post("/update-user", async function(req,res){
    var userService = new UserService();
    var user = new User();
    user._id = new ObjectId(req.body.id);
    user.roleId = req.body.roleId;
    user.userName = req.body.userName;
    user.password = req.body.password;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.gender = req.body.gender;
    user.birthDate = req.body.birthDate;
    user.email = req.body.email;
    user.phoneNumber = req.body.phoneNumber;
    user.address = req.body.address;
    user.status = req.body.status;
    await  userService.updateUser(user);
    res.json({status: true, message:""});
});


router.delete("/delete-user", async function(req,res){
    var userService = new UserService();
    await  userService.deleteUser(req.query.id);
    res.json({status: true, message:""});
});

module.exports = router;
