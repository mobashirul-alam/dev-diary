import express from "express";
import { create, getPosts } from "../controller/post.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getPosts", getPosts);

export default router;
