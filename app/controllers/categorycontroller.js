var express = require("express");
const { ObjectId } = require("mongodb");
var router = express.Router();
var Category = require("../model/category");
var CategoryService = require("../services/categoryService");


router.get("/", async function(req,res){
    var categoryService = new CategoryService();
    var category =  await categoryService.getCategoryList();
    res.json(category);
});

router.get("/get-category", async function(req,res){
    var categoryService = new CategoryService();
    var category =  await categoryService.getCategory(req.query.id);
    res.json(category);
});


router.post("/insert-category", async function(req,res){
    var categoryService = new CategoryService();
    var temp = new Category();

    temp.parentId = req.body.parentId;
    temp.name = req.body.name;
    temp.sortOrder = req.body.sortOrder;
    temp.status = true;

    var result =  await categoryService.insertCategory(temp);
    res.json({status: true, message:""});
});


router.post("/update-category", async function(req,res){
    var categoryService = new CategoryService();
    var temp = new Category();
    
    temp._id = new ObjectId(req.body.id);
    temp.parentId = req.body.parentId;
    temp.name = req.body.name;
    temp.sortOrder = req.body.sortOrder;
    temp.status = true;

    await  categoryService.updateCategory(temp);
    res.json({status: true, message:""});
});


router.delete("/delete-category", async function(req,res){
    var categoryService = new CategoryService();
    await  categoryService.deleteCategory(req.query.id);
    res.json({status: true, message:""});
});

module.exports = router;
