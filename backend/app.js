const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
const port = 3000;
const cors = require("cors");
const categoryRoutes = require("./routes/category");
const brandRoutes = require("./routes/brand");
const productRoutes = require("./routes/product");
const customerRoutes = require("./routes/customer");
const authRoutes = require("./routes/auth");
const { verifyToken,isAdmin } = require("./middleware/auth-middleware");
const reviewRoutes = require("./routes/review");
const paymentRoutes = require("./routes/payment");
const orderRoutes = require("./routes/order");

app.use(cors());
app.use(express.json());
app.get("/",(req,res) => {
    res.send("server running");
})

app.use("/category",verifyToken,isAdmin, categoryRoutes); 
app.use("/brand",verifyToken,isAdmin, brandRoutes);
app.use("/product",productRoutes);
app.use("/customer",verifyToken, customerRoutes);
app.use("/auth",authRoutes);
app.use("/api/reviews",reviewRoutes);
app.use("/api/payment",paymentRoutes);
app.use("/api/orders",orderRoutes);


async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed", err);
  }
}
connectDb();

app.listen(port,() =>{
    console.log("server running on this port", port);
})