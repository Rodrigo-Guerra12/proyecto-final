import express from "express";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import IUser from "../models/userModel";

const router = express.Router();

router.post("/login", async (req, res) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const { email, password } = req.body;
  const user: any = await User.findOne({ email: email });

  if (!user) {
    return res
      .status(401)
      .json({ message: "Authentication failed, user not found" });
  }
  if (secretKey && user) {
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign({ email: user.email }, secretKey, {
        expiresIn: "1h",
      });
      return res.status(200).json({ token });
    }
  }

  return res.status(401).json({
    message: "Authentication failed, user and password must match...",
  });
});

router.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  const existingUser = await User.findOne({ email: email });
  console.log("que trae existingUser: ", existingUser);
  if (existingUser) {
    return res.status(400).json({ message: "Username is already taken" });
  }

  const saltRounds = 10;

  bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    const data = new User({
      name,
      email,
      password: hash,
    });
    const newUser = await data.save();
    return res.status(201).json({ message: "User registered successfully" });
  });
});

export default router;
