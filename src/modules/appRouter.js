import express from "express";

import AuthRouter from "./auth/auth.routes.js";
import UserRouter from "./users/user.routes.js";
import ArtistRouter from "./artists/artist.routes.js";
const router = express.Router();

router.use("/auth", AuthRouter);
router.use("/users", UserRouter);
router.use("/artists", ArtistRouter);

export default router;