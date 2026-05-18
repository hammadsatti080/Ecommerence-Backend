const express = require("express");
const router = express.Router();
const {
    createOrder,
    getOrders,
    updateOrderStatus,
    deleteOrder,
} = require("../controllers/orderController");

// User creates an order
router.post("/", createOrder);

// Admin gets all orders (with optional status filter)
router.get("/", getOrders);

// Admin updates order status
router.put("/:id", updateOrderStatus);

router.delete("/:id", deleteOrder);
module.exports = router;