import express from "express";

import AuthRouter from "./auth/auth.routes.js";
import UserRouter from "./users/user.routes.js";

const router = express.Router();

router.use("/auth", AuthRouter);
router.use("/users", UserRouter);

export default router;