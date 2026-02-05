const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false 
    },

    role: {
      type: String,
      enum: ["customer", "provider"],
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
