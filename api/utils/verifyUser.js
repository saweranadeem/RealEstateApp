import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  // console.log(token);
  if (!token) return next(errorHandler(401, "Unauthorized"));

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden"));

    req.user = user;
    // console.log(user);
    next();
  });
};
