const express = require("express");
const router = express.Router();
const Saved = require("../models/Saved");

// SAVE PRODUCT
router.post("/save", async (req, res) => {
    const { userEmail, product } = req.body;

    if (!userEmail || !product?._id) {
        return res.status(400).json({ message: "Invalid data" });
    }

    const exists = await Saved.findOne({
        userEmail,
        productId: product._id,
    });

    if (exists) {
        return res.status(200).json({ message: "Already saved" });
    }

    await Saved.create({
        userEmail,
        productId: product._id,
        product,
    });

    res.status(200).json({ message: "Product saved" });
});

// GET SAVED PRODUCTS
router.get("/", async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const items = await Saved.find({ userEmail: email });

    res.status(200).json(items);
});

router.delete("/:id", async (req, res) => {
    await Saved.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

module.exports = router;