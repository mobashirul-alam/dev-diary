import express from "express";
import {
    create,
    deletePost,
    getPosts,
    updatePost,
} from "../controller/post.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getPosts", getPosts);
router.delete("/deletePost/:postId/:userId", verifyToken, deletePost);
router.put("/updatePost/:postId/:userId", verifyToken, updatePost);

export default router;
