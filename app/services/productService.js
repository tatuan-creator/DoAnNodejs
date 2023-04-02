const { ObjectId } = require('mongodb');
const config = require("../../config/setting.json");

class ProductService {
    databaseConnection = require('../database/database');
    Product = require('../model/product-related-models/product');
    ProductImage = require('../model/product-related-models/productImage');
    client;
    productDatabase;
    productCollection;
    productImageCollection;
    constructor() {
        this.client = this.databaseConnection.getMongoClient();
        this.productDatabase = this.client.db(config.mongodb.database);
        this.productCollection = this.productDatabase.collection("product");
        this.productImageCollection = this.productDatabase.collection("productImage");
    }

    async deleteProduct(id) {
        return await this.productCollection.deleteOne({ "_id": new ObjectId(id) });
    }

    async updateProduct(product) {
        return await this.productCollection.updateOne({ "_id": new ObjectId(product._id) }, { $set: product });
    }

    async insertProduct(product, images) {
        const productResult = await productCollection.insertOne(product);
        // Thêm ảnh cho sản phẩm
        for (let i = 0; i < images.length; i++) {
          const productImage = new ProductImage();
          productImage.productId = productResult.insertedId;
          productImage.image = images[i];
          productImage.sortOrder = i + 1;
          await productImageCollection.insertOne(productImage);
        }
      
        return productResult;
    }
      

    async getProduct(id) {
        return await this.productCollection.findOne({ "_id": new ObjectId(id) }, {});
    }

    async getProductList() {
        const cursor = await this.productCollection.find({}, {}).skip(0).limit(100);
        return await cursor.toArray();
    }
}

module.exports = ProductService;
