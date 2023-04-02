var express = require("express");
const { ObjectId } = require("mongodb");
var router = express.Router();
var Role = require("./../model/role");
var RoleService = require("../services/roleService");


router.get("/", async function(req,res){
    var roleService = new RoleService();
    var role =  await roleService.getRoleList();
    res.json(role);
});

router.get("/get-role", async function(req,res){
    var roleService = new RoleService();
    var role =  await roleService.getRole(req.query.id);
    res.json(role);
});


router.post("/insert-role", async function(req,res){
    var roleService = new RoleService();
    var ro = new Role();
    ro.name = req.body.name;
    var result =  await roleService.insertRole(ro);
    res.json({status: true, message:""});
});


router.post("/update-role", async function(req,res){
    var roleService = new RoleService();
    var ro = new Role();
    ro._id = new ObjectId(req.body.id);
    ro.name = req.body.name;
    await  roleService.updateRole(ro);
    res.json({status: true, message:""});
});


router.delete("/delete-role", async function(req,res){
    var roleService = new RoleService();
    await  roleService.deleteRole(req.query.id);
    res.json({status: true, message:""});
});

module.exports = router;
