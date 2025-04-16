import express from "express";
import { validateDto } from "../../middlewares/validateDto.js";
import { authGuard, roleGuard } from "../../middlewares/authGuard.js";
const router = express.Router();
router.get("/getAll", authGuard, roleGuard("admin"), (req, res) => res.status(200).json({ message: "Hello World" }));
router.get("/getById/:id", authGuard, roleGuard("admin"), (req, res) => res.status(200).json({ message: "Hello World" }));
router.get("/getByEmail", authGuard, roleGuard("admin"), (req, res) => res.status(200).json({ message: "Hello World" }));
router.put("/update", authGuard, roleGuard("admin"), (req, res) => res.status(200).json({ message: "Hello World" }));
router.post("/create", authGuard, roleGuard("admin"), (req, res) => res.status(200).json({ message: "Hello World" }));
router.delete("/delete", authGuard, roleGuard("admin"), (req, res) => res.status(200).json({ message: "Hello World" }));

export default router;