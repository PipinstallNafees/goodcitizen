import jwt from "jsonwebtoken";

// Protects routes that require login
const protect = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authorized. Please log in." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // attach user id to request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is invalid or expired." });
  }
};

export { protect };