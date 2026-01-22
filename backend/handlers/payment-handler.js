const Razorpay = require("razorpay");

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

exports.createRazorpayOrder = async(req,res) => {
    try{
        const {amount} = req.body;

        const options = {
            amount: parseInt(amount) * 100,
            currency: 'INR',
            receipt: `receipt_order_${Date.now()}`,
        };

        const order = await razorpayInstance.orders.create(options);
        res.status(200).json(order);
    }
    catch(err){
        console.error('razorpay order error', err);
        res.status(500).json({error: ' failed to create and razorpay order '});
    }
};   