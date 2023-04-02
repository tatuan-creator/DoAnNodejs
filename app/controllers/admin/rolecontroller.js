const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const Role = require("./../model/role");
const RoleService = require("../services/roleService");


router.get("/", async function(req,res){
    const roleService = new RoleService();
    const role =  await roleService.getRoleList();
    res.json(role);
});

router.get("/get-role", async function(req,res){
    const roleService = new RoleService();
    const role =  await roleService.getRole(req.query.id);
    res.json(role);
});


router.post("/insert-role", async function(req,res){
    const roleService = new RoleService();
    const ro = new Role();
    ro.name = req.body.name;
    const result =  await roleService.insertRole(ro);
    res.json({status: true, message:""});
});


router.post("/update-role", async function(req,res){
    const roleService = new RoleService();
    const ro = new Role();
    ro._id = new ObjectId(req.body.id);
    ro.name = req.body.name;
    await  roleService.updateRole(ro);
    res.json({status: true, message:""});
});


router.delete("/delete-role", async function(req,res){
    const roleService = new RoleService();
    await  roleService.deleteRole(req.query.id);
    res.json({status: true, message:""});
});

module.exports = router;
