import express from "express";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import { getAllPosts, createPost, updatePost, deletePost } from "../controllers/postController.js";

const router = express.Router();

router.get("/",        getAllPosts);
router.post("/",       protect, upload.single("image"), createPost);
router.put("/:id",     protect, upload.single("image"), updatePost);
router.delete("/:id",  protect, deletePost);

export default router;