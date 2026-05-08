const express = require("express");
const router = express.Router();
const {
    createOrder,
    getOrders,
    updateOrderStatus,
} = require("../controllers/orderController");

// User creates an order
router.post("/", createOrder);

// Admin gets all orders (with optional status filter)
router.get("/", getOrders);

// Admin updates order status
router.put("/:id", updateOrderStatus);

module.exports = router;