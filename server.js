const express = require("express");
    const nodemailer = require("nodemailer");
    const cors = require("cors");

    const app = express();
    app.use(express.json());
    app.use(cors());

    // ==============================
    // EMAIL CONFIG (IMPORTANT)
    // ==============================
    const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "srout2023@gift.edu.in",       // 🔴 replace
        pass: "nkyeiylmvulfpjgj"  // 🔴 replace (NO SPACES)
    }
    });

    // Verify email configuration
    transporter.verify((error, success) => {
    if (error) {
        console.log("❌ Email config error:", error);
    } else {
        console.log("✅ Email server is ready");
    }
    });

    // ==============================
    // OTP STORAGE (TEMPORARY)
    // ==============================
    const otpStore = {}; // { email: { otp, expires } }

    // Generate 6-digit OTP
    function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
    }

    // ==============================
    // SEND OTP API
    // ==============================
    app.post("/send-otp", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.json({ success: false, message: "Email required" });
    }

    const otp = generateOTP();

    otpStore[email] = {
        otp,
        expires: Date.now() + 5 * 60 * 1000 // 5 minutes
    };

    try {
        await transporter.sendMail({
        from: "OTP Service <YOUR_GMAIL@gmail.com>",
        to: email,
        subject: "Your OTP for Password Reset",
        text: `Your OTP is ${otp}. It is valid for 5 minutes.`
        });

        console.log("✅ OTP sent to:", email, "OTP:", otp);

        res.json({ success: true, message: "OTP sent to email" });
    } catch (error) {
        console.log("❌ Email send error:", error);
        res.status(500).json({ success: false, message: "Failed to send OTP" });
    }
    });

    // ==============================
    // VERIFY OTP API
    // ==============================
    app.post("/verify-otp", (req, res) => {
    const { email, otp } = req.body;

    if (!otpStore[email]) {
        return res.json({ success: false, message: "OTP not found" });
    }

    if (Date.now() > otpStore[email].expires) {
        delete otpStore[email];
        return res.json({ success: false, message: "OTP expired" });
    }

    if (otpStore[email].otp !== otp) {
        return res.json({ success: false, message: "Invalid OTP" });
    }

    delete otpStore[email];
    res.json({ success: true, message: "OTP verified successfully" });
    });

    // ==============================
    // START SERVER
    // ==============================
    app.listen(5000, () => {
    console.log("🚀 Server running on http://localhost:5000");
    });