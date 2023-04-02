const { ObjectId } = require('mongodb');
const config = require("../../config/setting.json");
class BrandService{
    databaseConnection = require('../database/database');
    brand = require('../model/brand');


    client;
    brandDatabase;
    brandCollection;
    constructor(){
        this.client = this.databaseConnection.getMongoClient();
        this.brandDatabase =  this.client.db(config.mongodb.database);
        this.brandCollection = this.brandDatabase.collection("brand");
    }
    async deleteBrand(id){
        return await this.brandCollection.deleteOne({"_id": new ObjectId(id) });
    }
    async updateBrand(brand){
        return await this.brandCollection.updateOne({"_id": new ObjectId(brand._id) }, {$set: brand});
    }
    async insertBrand(brand){
        return await this.brandCollection.insertOne(brand);
    }
    async getBrand(id){
        return await this.brandCollection.findOne({"_id": new ObjectId(id) },{});
    }
    async getBrandList() {
        const cursor = await this.brandCollection.find({}, {}).skip(0).limit(100);
        return await cursor.toArray();
    }
}
module.exports = BrandService;
