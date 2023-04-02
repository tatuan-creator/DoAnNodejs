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

    async insertProduct(product, productImageList){
        const session = await this.client.startSession();
        session.startTransaction();
        try {
            const insertedProduct = await this.productCollection.insertOne(product, { session });
    
            const productImages = productImageList.map((image) => {
                image.productId = insertedProduct.insertedId;
                return image;
            });
            const insertedProductImages = await this.productImageCollection.insertMany(productImages, { session });
    
            await session.commitTransaction();
            session.endSession();
    
            return insertedProduct.insertedId;
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
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
