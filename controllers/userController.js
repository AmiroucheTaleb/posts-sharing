import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as env from "dotenv";
env.config();
import User from "../models/User.js";
const createToken = (user) => {
  return jwt.sign({ user }, process.env.SECERT, {
    expiresIn: "7d",
  });
};

export const registerValidations = [
  body("name").not().isEmail().withMessage("Name is required"),
  body("email").not().isEmpty().withMessage("Email is required"),
  body("password").isLength({ min: 6 }).withMessage("Pasword must be atleast 6 leter"),
];

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({ errors: [{ msg: "Email is already taken." }] });
    }
    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    try {
      const user = await User.create({
        name,
        email,
        password: hash,
      });
      const token = createToken(user);
      return res.status(200).json({ msg: "Your account has been created", token });
    } catch (err) {
      return res.status(500).json({ errors: err });
    }
  } catch (err) {
    return res.status(500).json({ errors: err });
  }
};

export const loginValidations = [
  body("email").not().isEmpty().withMessage("Email is required"),
  body("password").not().isEmpty().withMessage("Password is required"),
];

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const matched = await bcrypt.compare(password, user.password);
      if (matched) {
        const token = createToken(user._id);
        return res.status(200).json({ msg: "Your account has been created", token });
      } else {
        return res.status(404).json({ errors: [{ msg: "Password is not correct." }] });
      }
    } else {
      return res.status(404).json({ errors: [{ msg: "Email not found" }] });
    }
  } catch (err) {
    return res.status(500).json({ errors: err });
  }
};
