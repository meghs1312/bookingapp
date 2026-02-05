const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");



exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;


    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields required" });
    }

   
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be 8+ chars with uppercase, lowercase, number, special character"
      });
    }

    if (!["customer", "provider"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Registered successfully",
      token
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

   

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }



    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      role: user.role
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
