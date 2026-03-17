const mongoose = require("mongoose");
const wishlistSchema = new mongoose.Schema({
    userId: { type: Schema.Types.OnjectId,ref: 'users'},
    productsId: Array(String),
});
const Wishlist = mongoose.model("wishlist",wishlistSchema);
module.exports = Wishlist;