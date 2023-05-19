import app from "express";
const router = app.Router();
import {
  register,
  registerValidations,
  login,
  loginValidations,
} from "../controllers/userController.js";

router.post("/register", registerValidations, register);
router.post("/login", loginValidations, login);

export default router;
