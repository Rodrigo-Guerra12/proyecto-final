import express from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";

const authMiddleware: express.RequestHandler = (req, res, next) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed, missing token" });
  }

  if (secretKey) {
    try {
      const decoded: JwtPayload = jwt.verify(token, secretKey) as JwtPayload;
      next();
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Authentication failed, invalid token" });
    }
  }
};

export default authMiddleware;
