const { ObjectId } = require('mongodb');
const config = require("../../config/setting.json");
class OrderService{
    databaseConnection = require('../database/database');
    Order = require('../model/order');
    OrderDetail = require('../model/orderDetail');


    client;
    orderDatabase;
    orderCollection;
    constructor(){
        this.client = this.databaseConnection.getMongoClient();
        this.orderDatabase =  this.client.db(config.mongodb.database);
        this.orderCollection = this.orderDatabase.collection("order");
    }
    async deleteOrder(id){
        return await this.orderCollection.deleteOne({"_id": new ObjectId(id) });
    }
    async updateOrder(order){
        return await this.orderCollection.updateOne({"_id": new ObjectId(order._id) }, {$set: order});
    }
    async insertOrder(order, orderDetailList){
        const session = await this.client.startSession();
        session.startTransaction();
        try {
            const insertedOrder = await orderCollection.insertOne(order, { session });
    
            const orderDetails = orderDetailList.map((detail) => {
                detail.orderId = insertedOrder.insertedId;
                return detail;
            });
            const insertedOrderDetails = await orderDetailCollection.insertMany(orderDetails, { session });
    
            await session.commitTransaction();
            session.endSession();
    
            return insertedOrder.insertedId;
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    }
    async getOrder(id){
        return await this.orderCollection.findOne({"_id": new ObjectId(id) },{});
    }
    async getOrderList() {
        const cursor = await this.orderCollection.find({}, {}).skip(0).limit(100);
        return await cursor.toArray();
    }
}
module.exports = OrderService;
