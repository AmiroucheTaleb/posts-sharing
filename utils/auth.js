import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const authHeaders = req.headers.authorization;
  const token = authHeaders.split("Bearer ")[1];
  try {
    const decoded = jwt.verify(token, "somesecert");
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ errors: [{ msg: error.message }] });
  }
};
