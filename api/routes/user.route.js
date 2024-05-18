import express from "express";
import {
    deleteUser,
    signOut,
    test,
    updateUser,
} from "../controller/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/test", test);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/signOut", signOut);

export default router;
