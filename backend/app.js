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
CORS CONFIGURATION
====================================
*/

const allowedOrigins = [
  "http://localhost:4200",
  "https://e-comm-store-rho.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS not allowed"));
    },
    credentials: true,
  }),
);

/* FIXED LINE */
app.options(/.*/, cors());

/*
====================================
GLOBAL MIDDLEWARE
====================================
*/

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

app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);

/*
====================================
PROTECTED ROUTES
====================================
*/

app.use("/customer", verifyToken, customerRoutes);
app.use("/category", verifyToken, isAdmin, categoryRoutes);
app.use("/brand", verifyToken, isAdmin, brandRoutes);

/*
====================================
DATABASE CONNECTION
====================================
*/

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

/*
====================================
SERVER START
====================================
*/

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
