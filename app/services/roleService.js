const { ObjectId } = require('mongodb');
const config = require("../../config/setting.json");
class RoleService{
    databaseConnection = require('../database/database');
    role = require('../model/role');


    client;
    roleDatabase;
    roleCollection;
    constructor(){
        this.client = this.databaseConnection.getMongoClient();
        this.roleDatabase =  this.client.db(config.mongodb.database);
        this.roleCollection = this.roleDatabase.collection("role");
    }
    async deleteRole(id){
        return await this.roleCollection.deleteOne({"_id": new ObjectId(id) });
    }
    async updateRole(role){
        return await this.roleCollection.updateOne({"_id": new ObjectId(role._id) }, {$set: role});
    }
    async insertRole(role){
        return await this.roleCollection.insertOne(role);
    }
    async getRole(id){
        return await this.roleCollection.findOne({"_id": new ObjectId(id) },{});
    }
    async getRoleList() {
        const cursor = await this.roleCollection.find({}, {}).skip(0).limit(100);
        return await cursor.toArray();
    }
}
module.exports = RoleService;
