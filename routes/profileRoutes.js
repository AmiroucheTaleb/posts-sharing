import express from "express";
import auth from "../utils/auth.js";
const router = express.Router();
import {
  updateName,
  updatePassword,
  updatePasswordValidations,
} from "../controllers/profileController.js";
router.post("/updateName", auth, updateName);
router.post("/updatePassword", [auth, updatePasswordValidations], updatePassword);
export default router;
