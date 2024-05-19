import express from "express";
import { create, deletePost, getPosts } from "../controller/post.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getPosts", getPosts);
router.delete("/deletePost/:postId/:userId", verifyToken, deletePost);

export default router;
