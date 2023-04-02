var express = require("express");
const { ObjectId } = require("mongodb");
var router = express.Router();
var Brand = require("../model/brand");
var BrandService = require("../services/brandService");


router.get("/", async function(req,res){
    var brandService = new BrandService();
    var brand =  await brandService.getBrandList();
    res.json(brand);
});

router.get("/get-brand", async function(req,res){
    var brandService = new BrandService();
    var brand =  await brandService.getBrand(req.query.id);
    res.json(brand);
});


router.post("/insert-brand", async function(req,res){
    var brandService = new BrandService();
    var temp = new Brand();

    temp.name = req.body.name;
    temp.image = req.body.image;
    temp.status = true;

    var result =  await brandService.insertBrand(temp);
    res.json({status: true, message:""});
});


router.post("/update-brand", async function(req,res){
    var brandService = new BrandService();
    var temp = new Brand();
    
    temp._id = new ObjectId(req.body.id);
    temp.name = req.body.name;
    temp.image = req.body.image;
    temp.status = true;

    await  brandService.updateBrand(temp);
    res.json({status: true, message:""});
});


router.delete("/delete-brand", async function(req,res){
    var brandService = new BrandService();
    await  brandService.deleteBrand(req.query.id);
    res.json({status: true, message:""});
});

module.exports = router;
