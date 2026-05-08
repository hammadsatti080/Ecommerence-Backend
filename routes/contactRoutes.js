const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");
require("dotenv").config();

// transporter setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// POST /api/contact
router.post("/", async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // ✅ Validation
        if (!name || !email || !message) {
            return res.status(400).json({
                error: "All fields (name, email, message) are required",
            });
        }

        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                error: "Invalid email format",
            });
        }

        // ✅ Save to MongoDB
        const newContact = new Contact({
            name,
            email,
            message,
        });

        await newContact.save();

        // ✅ Send email to you
        await transporter.sendMail({
            from: `"Contact Form" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: "📩 New Contact Message",
            html: `
        <h2>New Contact Form Submission</h2>
        <hr/>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        });

        // ✅ Optional: Auto-reply to user
        await transporter.sendMail({
            from: `"Support Team" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "We received your message",
            html: `
        <h3>Hello ${name},</h3>
        <p>Thank you for contacting us. We have received your message and will get back to you shortly.</p>
        <br/>
        <p><b>Your Message:</b></p>
        <p>${message}</p>
        <br/>
        <p>Best regards,<br/>Support Team</p>
      `,
        });

        // ✅ Final response
        res.status(200).json({
            message: "Message sent and saved successfully",
        });

    } catch (error) {
        console.error("❌ Error in contact route:", error);
        console.error("❌ BACKEND ERROR:", error);
        res.status(500).json({
            error: "Something went wrong. Please try again later.",
        });
    }
});

module.exports = router;