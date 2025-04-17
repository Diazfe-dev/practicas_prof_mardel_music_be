import express from "express";
import { ROLE_ADMIN_TAG } from '../../constants/constants.js';
import { AuthGuard, RoleGuard } from "../common/middlewares/index.js";

const UserRouter = express.Router();
UserRouter.get("/getAll", AuthGuard, RoleGuard(ROLE_ADMIN_TAG), (req, res) => res.status(200).json({ message: "Hello World" }));
UserRouter.get("/getById/:id", AuthGuard, RoleGuard(ROLE_ADMIN_TAG), (req, res) => res.status(200).json({ message: "Hello World" }));
UserRouter.get("/getByEmail", AuthGuard, RoleGuard(ROLE_ADMIN_TAG), (req, res) => res.status(200).json({ message: "Hello World" }));
UserRouter.put("/update", AuthGuard, RoleGuard(ROLE_ADMIN_TAG), (req, res) => res.status(200).json({ message: "Hello World" }));
UserRouter.post("/create", AuthGuard, RoleGuard(ROLE_ADMIN_TAG), (req, res) => res.status(200).json({ message: "Hello World" }));
UserRouter.delete("/delete", AuthGuard, RoleGuard(ROLE_ADMIN_TAG), (req, res) => res.status(200).json({ message: "Hello World" }));

export default UserRouter;