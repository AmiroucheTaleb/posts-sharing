import express from "express";
const router = express.Router();
import {
  createPoste,
  deletePoste,
  getPoste,
  getPostes,
  updatePoste,
} from "../controllers/postController.js";
import auth from "../utils/auth.js";

router.post("/create_post", createPoste);
router.patch("/update", updatePoste);
// router.post("/updateImage", auth, updateImage);
router.get("/", getPostes);
router.get("/:posteId", getPoste);
router.delete("/:posteId", deletePoste);
// router.get("/home/:page", home);
// router.get("/explore/:id", postDetails);
// router.post("/comment", auth, postComment);
export default router;
//TODO 38
