const WebsiteRating = require("../models/WebsiteRating");

const addRating = async (req, res) => {

    try {

        const {
            userEmail,
            userWebsiteRating,
            userReviewMessage,
        } = req.body;

        // Validation
        if (!userEmail || !userWebsiteRating) {
            return res.status(400).json({
                success: false,
                message: "Email and rating are required",
            });
        }

        const newRating = new WebsiteRating({
            userEmail,
            userWebsiteRating,
            userReviewMessage,
        });

        await newRating.save();

        res.status(201).json({
            success: true,
            message: "Rating submitted successfully",
            data: newRating,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

module.exports = {
    addRating,
};