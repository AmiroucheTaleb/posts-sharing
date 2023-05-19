import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";

export const updateName = async (req, res) => {
  const { name, id } = req.body;
  if (name === "") {
    return res.status(400).json({ errors: [{ msg: "Name is required" }] });
  } else {
    try {
      const user = await User.findOneAndUpdate({ _id: id }, { name: name }, { new: true });
      const token = jwt.sign({ user }, process.env.SECRET, {
        expiresIn: "7d",
      });
      return res.status(200).json({ token, msg: "Your name has been updated" });
    } catch (error) {
      return res.status(500).json({ errors });
    }
  }
};
export const updatePasswordValidations = [
  body("current").not().isEmpty().trim().withMessage("Current password is required"),
  body("newPassword").isLength({ min: 6 }).withMessage("New password must be 6 characters long"),
];
export const updatePassword = async (req, res) => {
  const { current, newPassword, userId } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const user = await User.findOne({ _id: userId });
    if (user) {
      const matched = await bcrypt.compare(current, user.password);
      if (!matched) {
        return res.status(400).json({ errors: [{ msg: "Current password is wrong" }] });
      } else {
        try {
          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(newPassword, salt);
          const newUser = await User.findOneAndUpdate(
            { _id: user },
            { password: hash },
            { new: true }
          );
          return res.status(200).json({ msg: "Your password has been updated" });
        } catch (error) {
          return res.status(500).json({ errors });
        }
      }
    }
  }
};
