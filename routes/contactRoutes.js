const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");
require("dotenv").config();

/* ---------------- EMAIL TRANSPORTER ---------------- */
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

/* ---------------- GET ALL REVIEWS ---------------- */
router.get("/", async (req, res) => {
    try {
        const reviews = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Error" });
    }
});

/* ---------------- GET BY EMAIL ---------------- */
router.get("/email/:email", async (req, res) => {
    try {
        const email = req.params.email;

        if (!email) {
            return res.status(400).json({
                error: "Email is required",
            });
        }

        const reviews = await Contact.find({ email }).sort({
            createdAt: -1,
        });

        res.status(200).json(reviews);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Error" });
    }
});

/* ---------------- DELETE REVIEW ---------------- */
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Contact.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                error: "Review not found",
            });
        }

        res.json({
            success: true,
            message: "Review deleted successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Error" });
    }
});

/* ---------------- POST CONTACT ---------------- */
router.post("/", async (req, res) => {
    const { name, email, message, rating } = req.body;

    try {
        /* VALIDATION */
        if (!name || !email || !message || rating === undefined) {
            return res.status(400).json({
                error: "All fields are required",
            });
        }

        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                error: "Invalid email format",
            });
        }

        /* SAVE TO DB */
        const newContact = new Contact({
            name,
            email,
            message,
            rating,
        });

        await newContact.save();

        console.log("Rating:", rating + " Star");

        /* ---------------- EMAIL TO OWNER (SAFE) ---------------- */
        try {
            await transporter.sendMail({
                from: `"Contact Form" <${process.env.EMAIL_USER}>`,
                to: process.env.EMAIL_USER,
                subject: "📩 New Contact Message",
                html: `
                    <h2>New Contact Form Submission</h2>
                    <hr/>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Rating:</strong> ${rating} ⭐</p>
                    <p><strong>Message:</strong> ${message}</p>
                `,
            });
        } catch (mailError) {
            console.log("Owner email failed:", mailError.message);
        }

        /* ---------------- AUTO REPLY (SAFE) ---------------- */
        try {
            await transporter.sendMail({
                from: `"Support Team" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: "We received your message",
                html: `
                    <h3>Hello ${name},</h3>
                    <p>Thank you for contacting us.</p>
                    <p>We will get back to you soon.</p>
                    <br/>
                    <p><b>Your Message:</b></p>
                    <p>${message}</p>
                `,
            });
        } catch (autoError) {
            console.log("Auto reply failed:", autoError.message);
        }

        /* FINAL RESPONSE */
        res.status(200).json({
            success: true,
            message: "Message saved successfully",
        });

    } catch (error) {
        console.error("❌ Contact route error:", error);

        res.status(500).json({
            success: false,
            error: "Something went wrong. Please try again later.",
        });
    }
});

module.exports = router;