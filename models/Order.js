const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: {
            name: String,
           email: { type: String, required: true, lowercase: true },
            address: String,
            phone: String,
        },

        items: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
                name: String,
                qty: Number,
                price: Number,
            },
        ],
        totalPrice: Number,
        status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" },
        deliveryTime: { type: String, default: "" },
        paymentMethod: { type: String, default: "online" },
        paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);