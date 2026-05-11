/*
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();


connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const categoryRoutes = require("./routes/categoryRoutes");
app.use("/api/categories", categoryRoutes);
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);
app.use("/api/contact", require("./routes/contactRoutes"))
app.use("/api/auth",  require("./routes/authRoutes") );
app.use("/api/orders", require("./routes/orderRoutes"));
// Test route
app.get('/', (req, res) => {
  res.json({ message: '🚀 E-commerce API is running...' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

*/

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "🚀 E-commerce API is running..." });
});

// For Local Development
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

// Export app for Vercel
module.exports = app;