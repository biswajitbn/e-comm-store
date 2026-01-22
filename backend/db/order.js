const mongoose = require("mongoose");
// const { default: products } = require("razorpay/dist/types/products");

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
        name: String,
        price: Number,
        discount: Number,
        images: [String],
        quantity: { type: Number, required: true },
      },
    ],

    total: {
      type: Number,
      required: true,
    },

    deliveryDetails: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      phone: { type: String, required: true },
    },

    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    paymentId: {
      type: String,
      default: null,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
