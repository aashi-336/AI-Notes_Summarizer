import jwt from "jsonwebtoken";

export const guestOrAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId; // attach only if valid
    } catch (err) {
      // ignore invalid token → treat as guest
    }
  }

  next(); // ALWAYS allow
};
