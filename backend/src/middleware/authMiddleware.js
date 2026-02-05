const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const isProvider = (req, res, next) => {
  if (req.user.role !== "provider") {
    return res.status(403).json({ message: "Provider only" });
  }
  next();
};

module.exports = { auth, isProvider };
