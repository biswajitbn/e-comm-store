const Order = require('../db/order');


exports.placeOrder = async(req,res) => {
    try{
        const order = new Order(req.body);
        await order.save();
        res.status(201).json({ message: 'order placed successfully', order })
    }
    catch(err){
        res.status(500).json({ error: 'order failed', details: err.message });
    }
}

exports.getMyOrders = async(req,res) => {
    try{
        const orders = await Order.find({userId: req.user._id}).sort({createdAt: - 1});
        res.json(orders);
    }
    catch(err){
        res.status(500).json({error: 'failed to fetch orders', details: err.message });
    }
}

exports.getOrderById = async(req,res) => {
    try{
        const order = await Order.findById({ _id: req.params.id });

        if(!order) {
            return res.status(404).json({ error: 'order not found'});
        }
        res.json(order);
    }
    catch(err){
        res.status(500).json({ error: 'failed to fetch order', details: err.message })
    }
}