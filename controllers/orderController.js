const Order = require("../models/Order");
const Product = require("../models/Product"); // Assuming you have product model

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const { user, cart } = req.body;

        if (!cart || cart.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        let totalPrice = 0;
        const items = cart.map((p) => {
            const finalPrice = p.price - (p.price * (p.discount || 0)) / 100;
            totalPrice += finalPrice * p.qty;
            return {
                productId: p._id,
                name: p.name,
                qty: p.qty,
                price: finalPrice,
            };
        });

        const order = new Order({ user, items, totalPrice });
        await order.save();

        res.status(201).json({ message: "Order created", order });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get all orders (Admin)
/*
exports.getOrders = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
*/

// Get all orders (Admin or User)
/*
exports.getOrders = async (req, res) => {
    try {
        const { status, email } = req.query; 
        const filter = {};

        if (status) filter.status = status;
        if (email) filter["user.email"] = email; 
        

        const orders = await Order.find(filter).sort({ createdAt: -1 });
  
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};
*/

// Update order status or delivery time (Admin)
exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, deliveryTime } = req.body;

        const update = {};
        if (status) {
            const allowed = ["pending", "completed", "delivered", "cancelled"];

            if (!allowed.includes(status)) {
                return res.status(400).json({ message: "Invalid status" });
            }

            update.status = status;
        }
        if (deliveryTime) update.deliveryTime = deliveryTime;

        const order = await Order.findByIdAndUpdate(id, update, { new: true });
        if (!order) return res.status(404).json({ message: "Order not found" });

        res.json({ message: "Order updated", order });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};



// Get orders (Admin or User)
exports.getOrders = async (req, res) => {
    try {
        const { status, email } = req.query; // get email query
        const filter = {};

        if (status) filter.status = status;

        if (email) {
            // Exact match, case-insensitive
            filter["user.email"] = { $regex: new RegExp(`^${email.trim()}$`, "i") };
        }

        const orders = await Order.find(filter).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};