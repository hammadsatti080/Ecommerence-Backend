const UserProfile = require("../models/UserProfile");


// ================= SAVE OR UPDATE PROFILE =================
exports.saveProfile = async (req, res) => {
    try {
        const { email, name, phone, address, city, country, bio } = req.body;

        const profile = await UserProfile.findOneAndUpdate(
            { email }, // unique user
            { email, name, phone, address, city, country, bio },
            { new: true, upsert: true }
        );

        res.json({
            success: true,
            message: "Profile saved successfully",
            data: profile,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};


// ================= GET PROFILE =================
exports.getProfile = async (req, res) => {
    try {
        const { email } = req.params;

        const profile = await UserProfile.findOne({ email });

        res.json({
            success: true,
            data: profile,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};