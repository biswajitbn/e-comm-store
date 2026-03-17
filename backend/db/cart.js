const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
    userId: { type: Schema.Types.OnjectId,ref: 'users'},
    productsId: Array(String),
});
const Cart = mongoose.model("cart", cartSchema);
module.exports = Cart;