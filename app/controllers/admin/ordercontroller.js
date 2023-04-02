const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const Order = require("../../model/order");
const OrderDetail = require("../../model/orderDetail");
const OrderService = require("../../services/orderService");


router.get("/", async function(req,res){
    const orderService = new OrderService();
    const order =  await orderService.getOrderList();
    res.json(order);
});

router.get("/get-order", async function(req,res){
    const orderService = new OrderService();
    const order =  await orderService.getOrder(req.query.id);
    res.json(order);
});


router.post("/insert-order", async function(req,res){
    const orderService = new OrderService();
    const temp = new Order();
    const orderDetailList = [];

    temp.userId = req.body.userId;
    temp.orderDate = new Date();
    temp.status = 0;

    for (const item of req.body.orderDetails) {
        const orderDetail = new OrderDetail();
        orderDetail.productId = item.productId;
        orderDetail.quantity = item.quantity;
        orderDetail.price = item.price;
        orderDetailList.push(orderDetail);
    }

    const result = await orderService.insertOrder(temp, orderDetailList);
    res.json({status: true, message:""});
});


router.post("/update-order", async function(req,res){
    const orderService = new OrderService();
    const temp = new Order();
    
    temp._id = new ObjectId(req.body.id);
    temp.status = req.body.status;

    await  orderService.updateOrder(temp);
    res.json({status: true, message:""});
});


router.delete("/delete-order", async function(req,res){
    const orderService = new OrderService();
    await  orderService.deleteOrder(req.query.id);
    res.json({status: true, message:""});
});

module.exports = router;
