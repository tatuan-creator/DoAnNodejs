const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const ProductService = require("../services/productService");
const Product = require("../model/product-related-models/product");

// Lấy danh sách sản phẩm
router.get("/", async (req, res) => {
    const productService = new ProductService();
    const products = await productService.getProductList();
    res.json(products);
});

// Lấy thông tin sản phẩm theo id
router.get("/get-product", async (req, res) => {
    const productService = new ProductService();
    const product = await productService.getProduct(req.query.id);
    res.json(product);
});

// Thêm sản phẩm mới
router.post("/insert-product", async (req, res) => {
    const productService = new ProductService();
    const temp = new Product();

    // Lấy thông tin sản phẩm từ body của request
    temp.categoryId = req.body.categoryId;
    temp.brandId = req.body.brandId;
    temp.name = req.body.name;
    temp.description = req.body.description;
    temp.productDetails = req.body.productDetails;
    temp.price = req.body.price;
    temp.viewCount = 0;
    temp.createAt = new Date();
    temp.updateAt = new Date();
    temp.status = true;
    temp.evaluate = 0;
    temp.totalEvaluate = 0;

    // Lấy danh sách ảnh từ body của request
    const images = req.body.images;

    const result = await productService.insertProduct(temp, images);
    res.json({ status: true, message: "" });
});

// Cập nhật thông tin sản phẩm
router.put("/update-product", async (req, res) => {
    const productService = new ProductService();
    const temp = new Product();

    // Lấy thông tin sản phẩm từ body của request
    temp._id = new ObjectId(req.body.id);
    temp.categoryId = req.body.categoryId;
    temp.brandId = req.body.brandId;
    temp.name = req.body.name;
    temp.description = req.body.description;
    temp.productDetails = req.body.productDetails;
    temp.price = req.body.price;
    temp.updateAt = new Date();
    temp.status = req.body.status;

    await productService.updateProduct(temp);
    res.json({ status: true, message: "" });
});

// Xóa sản phẩm
router.delete("/delete-product", async (req, res) => {
    const productService = new ProductService();
    await productService.deleteProduct(req.query.id);
    res.json({ status: true, message: "" });
});

module.exports = router;
