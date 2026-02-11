const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    const { firstName, lastName, email, phone, password, confirmPassword } = req.body;
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
        return res.status(400).json({ msg: "All fields are required" });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ msg: "Passwords do not match" });
    }

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            firstName, lastName, email, phone,
            password: hashedPassword,
            profilePicture: req.file?.filename
        });

        await user.save();
        res.status(201).json({ msg: "Signup successful" });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};

exports.login = async (req, res) => {
    const { usernameOrEmail, password } = req.body;
    if (!usernameOrEmail || !password) return res.status(400).json({ msg: "All fields are required" });

    try {
        const user = await User.findOne({
            $or: [
                { email: usernameOrEmail },
                { firstName: usernameOrEmail } // can login with firstName
            ]
        });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({
            token,
            user: {
                firstName: user.firstName,
                profilePicture: user.profilePicture
            }
        });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ msg: "Email is required" });

    // For simplicity: just return success message
    // You can later add nodemailer to send reset link
    res.json({ msg: `Reset link sent to ${email}` });
};

exports.getProfile = async (req, res) => {
    res.json(req.user); // user loaded from authMiddleware
};
