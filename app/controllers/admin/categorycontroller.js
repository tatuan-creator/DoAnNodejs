const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const Category = require("../model/category");
const CategoryService = require("../services/categoryService");


router.get("/", async function(req,res){
    const categoryService = new CategoryService();
    const category =  await categoryService.getCategoryList();
    res.json(category);
});

router.get("/get-category", async function(req,res){
    const categoryService = new CategoryService();
    const category =  await categoryService.getCategory(req.query.id);
    res.json(category);
});


router.post("/insert-category", async function(req,res){
    const categoryService = new CategoryService();
    const temp = new Category();

    temp.parentId = req.body.parentId;
    temp.name = req.body.name;
    temp.sortOrder = req.body.sortOrder;
    temp.status = true;

    const result =  await categoryService.insertCategory(temp);
    res.json({status: true, message:""});
});


router.post("/update-category", async function(req,res){
    const categoryService = new CategoryService();
    const temp = new Category();
    
    temp._id = new ObjectId(req.body.id);
    temp.parentId = req.body.parentId;
    temp.name = req.body.name;
    temp.sortOrder = req.body.sortOrder;
    temp.status = true;

    await  categoryService.updateCategory(temp);
    res.json({status: true, message:""});
});


router.delete("/delete-category", async function(req,res){
    const categoryService = new CategoryService();
    await  categoryService.deleteCategory(req.query.id);
    res.json({status: true, message:""});
});

module.exports = router;
