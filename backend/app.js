const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

/*
====================================
ROUTES
====================================
*/
const categoryRoutes = require("./routes/category");
const brandRoutes = require("./routes/brand");
const productRoutes = require("./routes/product");
const customerRoutes = require("./routes/customer");
const authRoutes = require("./routes/auth");
const reviewRoutes = require("./routes/review");
const paymentRoutes = require("./routes/payment");
const orderRoutes = require("./routes/order");

/*
====================================
MIDDLEWARE
====================================
*/
const { verifyToken, isAdmin } = require("./middleware/auth-middleware");

/*
====================================
CORS CONFIGURATION (FIXED)
====================================
*/
const allowedOrigins = [
  "http://localhost:4200",
  "https://e-comm-store-rho.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // postman / mobile

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());

/*
====================================
TEST ROUTE
====================================
*/
app.get("/", (req, res) => {
  res.send("Server running");
});

/*
====================================
PUBLIC ROUTES
====================================
*/
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);

/*
====================================
PROTECTED ROUTES
====================================
*/
app.use("/api/customer", customerRoutes);
app.use("/api/category", verifyToken, isAdmin, categoryRoutes);
app.use("/api/brand", verifyToken, isAdmin, brandRoutes);

/*
====================================
DATABASE CONNECTION
====================================
*/
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.error("MongoDB Error:", err));

/*
====================================
START SERVER
====================================
*/
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
