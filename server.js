
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();


connectDB();

const app = express();

//app.use(cors());
app.use(cors({
  origin: "https://ecommerence-bay.vercel.app"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const categoryRoutes = require("./routes/categoryRoutes");
app.use("/api/categories", categoryRoutes);
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);
app.use("/api/contact", require("./routes/contactRoutes"))
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/saved", require("./routes/savedRoutes"));
app.use("/api/profile", require("./routes/userprofileRoutes"));
app.use("/api/rating", require("./routes/ratingRoutes"));

// Test route
app.get('/', (req, res) => {
  res.json({ message: '🚀 E-commerce API is running...' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

