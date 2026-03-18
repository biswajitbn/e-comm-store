const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

const categoryRoutes = require("./routes/category");
const brandRoutes = require("./routes/brand");
const productRoutes = require("./routes/product");
const customerRoutes = require("./routes/customer");
const authRoutes = require("./routes/auth");
const reviewRoutes = require("./routes/review");
const paymentRoutes = require("./routes/payment");
const orderRoutes = require("./routes/order");

const { verifyToken, isAdmin } = require("./middleware/auth-middleware");

/* CORS FIX */
const allowedOrigins = [
  "http://localhost:4200",
  "https://e-comm-store-rho.vercel.app",
  "https://your-backend-name.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.options("*", cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server running");
});

/* PUBLIC */
app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);

/* PROTECTED */
app.use("/customer", verifyToken, customerRoutes);
app.use("/category", verifyToken, isAdmin, categoryRoutes);
app.use("/brand", verifyToken, isAdmin, brandRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.error("MongoDB Error:", err));

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
