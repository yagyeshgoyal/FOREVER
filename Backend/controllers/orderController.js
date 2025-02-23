const orderModel = require("../models/orderModel"); 
const userModel = require("../models/userModel"); 


const placeOrder = async (req,res) =>{
    try{
        const {userId, items, amount , address} = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }


        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, {cartData:{}});

        
        res.json({success:true, message:"Order Placed Successfully"})

    }
    catch(error){
        console.log(error);
        res.json({success:false, message:error.message})
    }
}


const placeOrderStripe = async (req,res) =>{

}


const placeOrderRazorpay = async (req,res) =>{

}


const allOrders = async (req,res) =>{
    try{
        const orders = await orderModel.find({});
        res.json({success:true, orders});
    }
    catch(error){
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//  user order Data for frontend
const userOrders = async (req,res) =>{
    
    try{
        
        const {userId}   = req.body;
        const orders = await orderModel.find({userId});
        res.json({success:true, orders})
    }
    catch(error){
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

// update order status from admin panel

const updateStatus = async (req,res) =>{
    try{
        const {orderId, status} = req.body;
        await orderModel.findByIdAndUpdate(orderId, {status});

        res.json({success:true, message:"Order Status Updated"})
    }
    catch(error){
        console.log(error);
        res.json({success:false, message:error.message})
    }
}   

module.exports = {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus}

