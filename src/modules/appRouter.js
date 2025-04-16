import express from "express";
import authRoutes from "./auth/auth.routes.js";
import userRoutes from "./users/user.module.js";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
export default router;